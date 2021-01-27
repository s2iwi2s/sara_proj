package com.sara.service.impl;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.AccountPayablesSettings;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.GradeLevelPayables;
import com.sara.data.document.Payables;
import com.sara.data.document.QPayables;
import com.sara.data.document.School;
import com.sara.data.document.Student;
import com.sara.data.document.User;
import com.sara.data.repository.AccountPayablesSettingsMongoRepository;
import com.sara.data.repository.PayablesMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;
import com.sara.service.bean.BillingByInvoice;
import com.sara.service.bean.Invoice;
import com.sara.service.bean.PaymentInfo;
import com.sara.service.bean.StudentPayables;
import com.sara.service.exception.GradeLevelPayablesResponseException;

@Service
public class PayablesServiceImpl extends AbstractService<Payables, String> {

	private static final Logger log = LoggerFactory.getLogger(PayablesServiceImpl.class);

	private StudentServiceImpl studentServiceImpl;
	private GradeLevelPayablesServiceImpl gradeLevelPayablesServiceImpl;
	private AccountPayablesSettingsMongoRepository accountPayablesSettingsMongoRepository;
	private CodeGroupsServiceImpl codeGroupsServiceImpl;

	private MongoTemplate mongoTemplate;

	public PayablesServiceImpl(PayablesMongoRepository repo, SequenceGeneratorService sequenceGeneratorService,
			MongoTemplate mongoTemplate, StudentServiceImpl studentServiceImpl,
			GradeLevelPayablesServiceImpl gradeLevelPayablesServiceImpl,
			AccountPayablesSettingsMongoRepository accountPayablesSettingsMongoRepository,
			CodeGroupsServiceImpl codeGroupsServiceImpl) {
		super(repo, sequenceGeneratorService);
		this.studentServiceImpl = studentServiceImpl;
		this.mongoTemplate = mongoTemplate;
		this.gradeLevelPayablesServiceImpl = gradeLevelPayablesServiceImpl;
		this.accountPayablesSettingsMongoRepository = accountPayablesSettingsMongoRepository;
		this.codeGroupsServiceImpl = codeGroupsServiceImpl;
	}

	@Override
	public BooleanExpression getFindAllBooleanExpression(User user) {
		return QPayables.payables.student.school.eq(user.getSchool());
	}

	public Page<Payables> findAll(Pageable pageable) {
		return repo.findAll(pageable);
	}

	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder searchbb, User user) {
		searchbb.or(QPayables.payables.invoiceNo.containsIgnoreCase(searchValue));
		searchbb.or(QPayables.payables.student.firstName.containsIgnoreCase(searchValue));
		searchbb.or(QPayables.payables.student.lastName.containsIgnoreCase(searchValue));
	}

	@Override
	public Payables getNewEntity() {
		return new Payables();
	}

	@Override
	public Payables save(Payables entity, School school) {
		if (StringUtils.isBlank(entity.getId())) {
			String id = sequenceGeneratorService.nextSeq(Payables.SEQUENCE_NAME);
			entity.setId(id);
		}
		return super.save(entity, school);
	}

	public StudentPayables savePayables(List<Payables> list, Student student, String periodId) throws Exception {
		CodeGroups period = codeGroupsServiceImpl.findById(periodId);

		double remainingAmt = 0;
		student = studentServiceImpl.findById(student.getId());
		for (Payables p : list) {
			double payment = p.getPayment() + remainingAmt;
			double balance = p.getAmount() - p.getPaid();

			if (payment > balance) {
				remainingAmt = payment - balance;
				p.setPayment(balance);
			} else {
				p.setPayment(payment);
				remainingAmt = 0;
			}
			p.setStudent(student);
		}

		Date invoiceDate = new Date();
		String invoiceNo = this.save(list, invoiceDate, period);

		List<Payables> payables = getStudentPayables(student);
		List<Payables> payablesByInvoiceNo = getStudentPayables(student, period, invoiceNo);

		return new StudentPayables(payables, payablesByInvoiceNo, invoiceNo, invoiceDate);
	}

	public List<Payables> getStudentPayables(String id) throws GradeLevelPayablesResponseException {
		Student student = studentServiceImpl.findById(id);
		return getStudentPayables(student);
	}

	public List<Payables> getStudentPayables(Student student) throws GradeLevelPayablesResponseException {
		return getStudentPayables(student, student.getSchool().getCurrentPeriod(), null);
	}

	public List<Payables> getStudentPayables(Student student, String periodId)
			throws GradeLevelPayablesResponseException {
		CodeGroups period = codeGroupsServiceImpl.findById(periodId);
		return getStudentPayables(student, period, null);
	}

	public List<Payables> getStudentPayables(Student student, CodeGroups period, String invoiceNo)
			throws GradeLevelPayablesResponseException {
		List<Payables> payablesTmpl = getStudentPayablesTemplate(student, period);
		List<PaymentInfo> totalPayableList = findPaymentSumByStudent(student, period);

		List<Payables> payableList = new ArrayList<Payables>();
		for (Payables tmpl : payablesTmpl) {
			if (!StringUtils.isBlank(invoiceNo)) {
				List<PaymentInfo> sumPayableList = findPaymentSumByStudent(student, period, invoiceNo);
				Optional<PaymentInfo> pinfo = sumPayableList.stream().filter(sp -> tmpl.getCode().equals(sp.getCode()))
						.findFirst();
				if (pinfo.isPresent()) {
					PaymentInfo paymentInfo = pinfo.get();
					tmpl.setPaid(paymentInfo.getPayment());

					Optional<PaymentInfo> ptinfo = totalPayableList.stream()
							.filter(ptp -> tmpl.getCode().equals(ptp.getCode())).findFirst();
					if (ptinfo.isPresent()) {
						PaymentInfo paymentTotalInfo = ptinfo.get();
						tmpl.setBalance(tmpl.getAmount() - paymentTotalInfo.getPayment());
					}
					payableList.add(tmpl);
				}
			} else {
				Optional<PaymentInfo> ptinfo = totalPayableList.stream()
						.filter(ptp -> tmpl.getCode().equals(ptp.getCode())).findFirst();
				if (ptinfo.isPresent()) {
					PaymentInfo paymentInfo = ptinfo.get();
					tmpl.setBalance(tmpl.getAmount() - paymentInfo.getPayment());
					tmpl.setPaid(paymentInfo.getPayment());

				} else {
					tmpl.setBalance(tmpl.getAmount());
				}
				payableList.add(tmpl);
			}
		}

		return payableList;
	}

	public List<Payables> getStudentPayablesTemplate(Student student, CodeGroups period) throws GradeLevelPayablesResponseException {
		GradeLevelPayables gradeLevelPayables = gradeLevelPayablesServiceImpl.findByLevel(student.getLevel(),
				period);

		List<Payables> payableList = new ArrayList<Payables>();
		for (AccountPayablesSettings aps : gradeLevelPayables.getAccountPayablesSettings()) {
			payableList.add(new Payables(aps, student));
		}
		return payableList;
	}

	private String save(List<Payables> list, Date invoiceDate, CodeGroups period) {
		String invoiceNo = null;

		Iterator<Payables> it = list.iterator();
		while (it.hasNext()) {
			Payables entity = it.next();
			if (entity.getPayment() == 0) {
				it.remove();
			} else {
				if (StringUtils.isBlank(invoiceNo)) {
					invoiceNo = sequenceGeneratorService.nextSeq(Payables.SEQUENCE_INVOICE_NUM);
				}
				String id = sequenceGeneratorService.nextSeq(Payables.SEQUENCE_NAME);
				entity.setId(id);
				entity.setInvoiceNo(invoiceNo);
				entity.setInvoiceDate(invoiceDate);
				entity.setPeriod(period);
				Optional<AccountPayablesSettings> apsTemp = accountPayablesSettingsMongoRepository
						.findById(entity.getCode());
				entity.setAps(apsTemp.get());
			}
		}
		repo.saveAll(list);

		return invoiceNo;
	}

//	public List<PaymentInfo> findPaymentSumByStudent(String id) throws IllegalArgumentException{
//		Student student = studentServiceImpl.findById(id);
//		return findPaymentSumByStudent(student, student.getSchool().getSchoolYear(), null);
//	}
	public List<Payables> findPaymentByStudent(Student student, CodeGroups period) {
		return ((PayablesMongoRepository) repo).findByStudentAndPeriod(student, period);
	}

	public List<PaymentInfo> findPaymentSumByStudent(Student student, CodeGroups period) {
		return findPaymentSumByStudent(student, period, null);
	}

	public List<PaymentInfo> findPaymentSumByStudent(Student student, CodeGroups period, String invoiceNo) {
		AggregationOperation match = match(Criteria.where("student").is(student));
		AggregationOperation match2 = match(Criteria.where("period").is(period));

		Aggregation aggregation;
		if (!StringUtils.isBlank(invoiceNo)) {
			AggregationOperation match3 = match(Criteria.where("invoiceNo").is(invoiceNo));
			aggregation = newAggregation(match, match2, match3, group("code", "name").sum("payment").as("payment"),
//					sort(Sort.Direction.ASC, previousOperation(), "order"),
					project("code", "name", "payment"));

		} else {
			aggregation = newAggregation(match, match2, group("code", "name").sum("payment").as("payment"),
//					sort(Sort.Direction.ASC, previousOperation(), "order"),
					project("code", "name", "payment"));

		}

		AggregationResults<PaymentInfo> groupResults = mongoTemplate.aggregate(aggregation, Payables.class,
				PaymentInfo.class);
		List<PaymentInfo> list = groupResults.getMappedResults();
		return list;
	}

	public BillingByInvoice getBillingByInvoiceList(Student student, String periodId)
			throws GradeLevelPayablesResponseException {
		CodeGroups period = codeGroupsServiceImpl.findById(periodId);

		GradeLevelPayables gradeLevelPayables = gradeLevelPayablesServiceImpl.findByLevel(student.getLevel(), period);
		List<AccountPayablesSettings> accountPayablesSettings = gradeLevelPayables.getAccountPayablesSettings();
		accountPayablesSettings.sort(Comparator.comparing(AccountPayablesSettings::getPriority));

		List<Payables> payments = findPaymentByStudent(student, period);
		payments.sort(Comparator.comparing(Payables::getInvoiceDate, Collections.reverseOrder()));

		Map<String, Invoice> mapper = new HashMap<>();
		List<Invoice> list = new ArrayList<>();
		for (Payables payables : payments) {
			String invoiceNo = payables.getInvoiceNo();
			Invoice invoice = mapper.get(invoiceNo);
			if (invoice == null) {
				invoice = new Invoice(invoiceNo, payables.getInvoiceDate(), new HashMap<String, Payables>());
				mapper.put(invoiceNo, invoice);
				list.add(invoice);
			}
			invoice.getPayablesMap().put(payables.getCode(), payables);
		}
		return new BillingByInvoice(gradeLevelPayables.getAccountPayablesSettings(), list);
	}
}
