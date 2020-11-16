package com.sara.service.impl;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.previousOperation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.Payables;
import com.sara.data.document.QPayables;
import com.sara.data.document.Student;
import com.sara.data.document.User;
import com.sara.data.repository.PayablesMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;
import com.sara.service.bean.PaymentInfo;
import com.sara.service.bean.StudentPayables;

@Service
public class PayablesServiceImpl extends AbstractService<Payables, String> {

	private static final Logger log = LoggerFactory.getLogger(PayablesServiceImpl.class);

//	private PayablesMongoRepository repository;

	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;

	@Autowired
	private CodeGroupsServiceImpl codeGroupsServiceImpl;

	@Autowired
	private StudentServiceImpl studentServiceImpl;

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	public PayablesServiceImpl(PayablesMongoRepository repo, SchoolServiceImpl schoolServiceImpl) {
		super(repo);
//		this.repository = repo;
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
	public Payables save(Payables entity) {
		if (StringUtils.isBlank(entity.getId())) {
			String id = sequenceGeneratorService.nextSeq(Payables.SEQUENCE_NAME);
			entity.setId(id);
		}
		return super.save(entity);
	}

	public StudentPayables savePayables(List<Payables> list, Student student) throws Exception {
		double remainingAmt = 0;
		student = studentServiceImpl.findById(student.getId());
		String schoolYear = student.getSchool().getSchoolYear();
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
			p.setSchoolYear(schoolYear);
		}

		Date invoiceDate = new Date();
		String invoiceNo = this.save(list, invoiceDate);

		List<Payables> payables = getStudentPayables(student, student.getSchool().getSchoolYear());
		List<Payables> payablesByInvoiceNo = getStudentPayables(student, student.getSchool().getSchoolYear(),
				invoiceNo);

		return new StudentPayables(payables, payablesByInvoiceNo, invoiceNo, invoiceDate);
	}

	public List<Payables> getStudentPayables(String id, String schoolYear)
			throws JsonMappingException, JsonProcessingException, IllegalArgumentException {
		Student student = studentServiceImpl.findById(id);
		return getStudentPayables(student, schoolYear);
	}

	public List<Payables> getStudentPayables(Student student, String schoolYear)
			throws JsonMappingException, JsonProcessingException {
		return getStudentPayables(student, schoolYear, null);
	}

	public List<Payables> getStudentPayables(Student student, String schoolYear, String invoiceNo)
			throws JsonMappingException, JsonProcessingException {
		List<Payables> payablesTmpl = getStudentPayablesTemplate(student);
		List<PaymentInfo> totalPayableList = findPaymentSumByStudent(student, schoolYear);
//		log.debug("payablesTmpl={}", payablesTmpl);
//		log.debug("totalPayableList={}", totalPayableList);

		List<Payables> payableList = new ArrayList<Payables>();
		for (Payables tmpl : payablesTmpl) {
			if(!StringUtils.isBlank(invoiceNo)) {
				List<PaymentInfo> sumPayableList = findPaymentSumByStudent(student, schoolYear, invoiceNo);
				Optional<PaymentInfo> pinfo = sumPayableList.stream().filter(sp -> tmpl.getCode().equals(sp.getCode()))
						.findFirst();
//				log.debug("sumPayableList={}", sumPayableList);
				if (pinfo.isPresent()) {
					PaymentInfo paymentInfo = pinfo.get();
					tmpl.setPaid(paymentInfo.getPayment());
					
					Optional<PaymentInfo> ptinfo = totalPayableList.stream().filter(ptp -> tmpl.getCode().equals(ptp.getCode()))
							.findFirst();
					if (ptinfo.isPresent()) {
						PaymentInfo paymentTotalInfo = ptinfo.get();
						tmpl.setBalance(tmpl.getAmount() - paymentTotalInfo.getPayment());
					}
					payableList.add(tmpl);
				}
			} else {
				Optional<PaymentInfo> ptinfo = totalPayableList.stream().filter(ptp -> tmpl.getCode().equals(ptp.getCode()))
						.findFirst();
				if (ptinfo.isPresent()) {
					PaymentInfo paymentInfo = ptinfo.get();
					tmpl.setBalance(tmpl.getAmount() - paymentInfo.getPayment());
					tmpl.setPaid(paymentInfo.getPayment());

				}else {
					tmpl.setBalance(tmpl.getAmount());
				}
				payableList.add(tmpl);
			}
		}

//		Optional<PaymentInfo> balPayable = sumPayableList.stream().filter(p -> {
//			return p.getCode().equals("balance");
//		}).findFirst();
//
//		if (balPayable.isPresent()) {
//			PaymentInfo payInfo = balPayable.get();
//			payableList.add(new Payables(payInfo.getCode(), payInfo.getName(), 0, payInfo.getPayment(),
//					payableList.size(), student, 0, 0));
//		}

		return payableList;
	}

	public List<Payables> getStudentPayablesTemplate(String id)
			throws JsonMappingException, JsonProcessingException, IllegalArgumentException {
		Student student = studentServiceImpl.findById(id);
		return getStudentPayablesTemplate(student);
	}

	public List<Payables> getStudentPayablesTemplate(Student student)
			throws JsonMappingException, JsonProcessingException {

		CodeGroups payables = codeGroupsServiceImpl.findByCode("PAYABLES_" + student.getLevel().getValue(),
				student.getSchool());

		ObjectMapper mapper = new ObjectMapper();
		CollectionType javaType = mapper.getTypeFactory().constructCollectionType(List.class, Payables.class);

		List<Payables> payableList;
		if (payables != null && payables.getJson().length() > 0) {
			payableList = mapper.readValue(payables.getJson(), javaType);
		} else {
			payableList = new ArrayList<Payables>();
		}
		return payableList;
	}

	private String save(List<Payables> list, Date invoiceDate) {
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
			}
		}
		repo.saveAll(list);

		return invoiceNo;
	}

//	public List<PaymentInfo> findPaymentSumByStudent(String id) throws IllegalArgumentException{
//		Student student = studentServiceImpl.findById(id);
//		return findPaymentSumByStudent(student, student.getSchool().getSchoolYear(), null);
//	}
	public List<PaymentInfo> findPaymentSumByStudent(Student student, String schoolYear) {
		return findPaymentSumByStudent(student, schoolYear, null);
	}

	public List<PaymentInfo> findPaymentSumByStudent(Student student, String schoolYear, String invoiceNo) {
		AggregationOperation match = match(Criteria.where("student").is(student));
		AggregationOperation match2 = match(Criteria.where("schoolYear").is(schoolYear));

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
}
