package com.sara.service.impl;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.previousOperation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.AccountPayablesSettings;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.GradeLevelPayables;
import com.sara.data.document.Payables;
import com.sara.data.document.PayablesOld;
import com.sara.data.document.PaymentBalance;
import com.sara.data.document.Processing;
import com.sara.data.document.QPayables;
import com.sara.data.document.School;
import com.sara.data.document.Student;
import com.sara.data.document.User;
import com.sara.data.repository.PayablesMongoRepository;
import com.sara.data.repository.PayablesOldMongoRepository;
import com.sara.data.repository.PaymentBalanceRepository;
import com.sara.service.AbstractService;
import com.sara.service.Constants;
import com.sara.service.SequenceGeneratorService;
import com.sara.service.bean.BillingByInvoice;
import com.sara.service.bean.Invoice;
import com.sara.service.bean.PaymentBalanceResponse;
import com.sara.service.bean.PaymentInfo;
import com.sara.service.bean.StudentPayables;
import com.sara.service.dtos.AccountPayablesSettingsDto;
import com.sara.service.dtos.PayablesDto;
import com.sara.service.exception.ClosePeriodException;
import com.sara.service.exception.GradeLevelPayablesResponseException;
import com.sara.service.mappers.AccountPayablesSettingsMapper;
import com.sara.service.mappers.PayablesMapper;
import com.sara.service.mappers.PaymentBalanceMapper;

@Service
public class PayablesServiceImpl extends AbstractService<Payables, PayablesDto, String> {

	private static final Logger log = LoggerFactory.getLogger(PayablesServiceImpl.class);

	private StudentServiceImpl studentServiceImpl;
	private GradeLevelPayablesServiceImpl gradeLevelPayablesServiceImpl;
	private AccountPayablesSettingsServiceImpl accountPayablesSettingsServiceImpl;
	private CodeGroupsServiceImpl codeGroupsServiceImpl;
	private PayablesMapper payablesMapper;
	private AccountPayablesSettingsMapper accountPayablesSettingsMapper;
	private MongoTemplate mongoTemplate;
	private PayablesMongoRepository payablesMongoRepository;
	private PayablesOldMongoRepository payablesOldMongoRepository;
	private SchoolServiceImpl schoolServiceImpl;
	private PaymentBalanceRepository paymentBalanceRepository;
	private PaymentBalanceMapper paymentBalanceMapper;

	public PayablesServiceImpl(PayablesMongoRepository repo, SequenceGeneratorService sequenceGeneratorService,
			MongoTemplate mongoTemplate, StudentServiceImpl studentServiceImpl,
			GradeLevelPayablesServiceImpl gradeLevelPayablesServiceImpl,
			AccountPayablesSettingsServiceImpl accountPayablesSettingsServiceImpl,
			CodeGroupsServiceImpl codeGroupsServiceImpl, PayablesMapper payablesMapper,
			AccountPayablesSettingsMapper accountPayablesSettingsMapper,
			PayablesOldMongoRepository payablesOldMongoRepository, SchoolServiceImpl schoolServiceImpl,
			PaymentBalanceRepository paymentBalanceRepository, PaymentBalanceMapper paymentBalanceMapper) {
		super(repo, sequenceGeneratorService);
		this.studentServiceImpl = studentServiceImpl;
		this.mongoTemplate = mongoTemplate;
		this.gradeLevelPayablesServiceImpl = gradeLevelPayablesServiceImpl;
		this.accountPayablesSettingsServiceImpl = accountPayablesSettingsServiceImpl;
		this.codeGroupsServiceImpl = codeGroupsServiceImpl;
		this.payablesMapper = payablesMapper;
		this.accountPayablesSettingsMapper = accountPayablesSettingsMapper;
		this.payablesMongoRepository = repo;
		this.payablesOldMongoRepository = payablesOldMongoRepository;
		this.schoolServiceImpl = schoolServiceImpl;
		this.paymentBalanceRepository = paymentBalanceRepository;
		this.paymentBalanceMapper = paymentBalanceMapper;
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

	public StudentPayables savePayables(List<PayablesDto> dtoList, Student student, String periodId) throws Exception {
		CodeGroups period = codeGroupsServiceImpl.findById(periodId);

		double remainingAmt = 0;
		student = studentServiceImpl.findById(student.getId());

		List<Payables> list = payablesMapper.toEntities(dtoList);
		log.info("savePayables1 list={}", list);
		log.info("savePayables1 list.size={}", list.size());
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

		log.info("savePayables2 list={}", list);
		Date invoiceDate = new Date();
		String invoiceNo = this.save(list, invoiceDate, period);

		List<PayablesDto> payables = getStudentPayables(student);
		List<PayablesDto> payablesByInvoiceNo = getStudentPayables(student, period, invoiceNo);

		return new StudentPayables(payables, payablesByInvoiceNo, invoiceNo, invoiceDate);
	}

	public List<PayablesDto> getStudentPayables(String id) throws GradeLevelPayablesResponseException {
		Student student = studentServiceImpl.findById(id);
		return getStudentPayables(student);
	}

	public List<PayablesDto> getStudentPayables(Student student) throws GradeLevelPayablesResponseException {
		return getStudentPayables(student, student.getSchool().getCurrentPeriod(), null);
	}

	public List<PayablesDto> getStudentPayables(Student student, String periodId)
			throws GradeLevelPayablesResponseException {
		CodeGroups period = codeGroupsServiceImpl.findById(periodId);

		return getStudentPayables(student, period, null);
	}

	public List<PayablesDto> getStudentPayables(Student student, CodeGroups period, String invoiceNo)
			throws GradeLevelPayablesResponseException {
		List<Payables> studentPayables = getStudentPayables(student, period, invoiceNo, false);
		return payablesMapper.toDtos(studentPayables);
	}

	public List<Payables> getStudentPayables(Student student, CodeGroups period, String invoiceNo, boolean isProcess)
			throws GradeLevelPayablesResponseException {
		List<Payables> payablesTmpl = getStudentPayablesTemplate(student, period);
		List<PaymentInfo> totalPayableList = findPaymentSumByStudent(student, period, isProcess);

		if (!isProcess) {
			Payables balancePayables = getPaymentBalanceTmpl(student, period);
			payablesTmpl.add(balancePayables);
		}

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
					tmpl.setPeriod(period);
				} else {
					tmpl.setPeriod(period);
					tmpl.setBalance(tmpl.getAmount());
				}
				payableList.add(tmpl);
			}
		}

		return payableList;
	}

	private Payables getPaymentBalanceTmpl(Student student, CodeGroups period) {
		List<PaymentBalance> paymentBalances = paymentBalanceRepository.findByStudentAndPeriodOrderByOrder(student,
				period);

		Payables balancePayables = null;
		List<AccountPayablesSettings> apsList = accountPayablesSettingsServiceImpl.getOldAccounts(student.getSchool());
		log.info("[getPaymentBalanceTmpl] apsList.size=>{}", apsList.size());
		double amount = 0;
		AccountPayablesSettings aps = null;
		if (apsList.size() == 0) {
			aps = new AccountPayablesSettings(true, Constants.OLD_ACCOUNTS, period, student.getSchool());
			aps = accountPayablesSettingsServiceImpl.save(aps);
		} else {
			aps = apsList.get(0);
		}

		for (PaymentBalance p : paymentBalances) {
			amount += p.getAmount() - p.getPaid();
		}

		aps.setAmount(amount);

		log.info("[getPaymentBalanceTmpl] aps=>{}", aps);
		balancePayables = new Payables(aps, student);
		log.info("[getPaymentBalanceTmpl] balancePayables=>{}", balancePayables);
		return balancePayables;
	}

	public List<Payables> getStudentPayablesTemplate(Student student, CodeGroups period)
			throws GradeLevelPayablesResponseException {
		GradeLevelPayables gradeLevelPayables = gradeLevelPayablesServiceImpl.findByLevelAndPeriod(student.getLevel(),
				period, student.getSchool());

		List<Payables> payableList = new ArrayList<Payables>();
		for (AccountPayablesSettings aps : gradeLevelPayables.getAccountPayablesSettings()) {
			payableList.add(new Payables(aps, student));
		}

		Collections.sort(payableList);
		return payableList;
	}

	private String save(List<Payables> list, Date invoiceDate, CodeGroups period) {
		String invoiceNo = null;

		Iterator<Payables> it = list.iterator();
		while (it.hasNext()) {
			Payables entity = it.next();
			AccountPayablesSettings aps = accountPayablesSettingsServiceImpl.findById(entity.getCode());
			if (entity.getPayment() == 0 && !aps.isText()) {
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
				entity.setSchool(entity.getStudent().getSchool());
				entity.setStatusCode(Constants.PROCESS_STATUS_CREATED);
				entity.setAps(aps);
				entity.setOrder(aps.getPriority());
			}
		}
		repo.saveAll(list);

		return invoiceNo;
	}

//	public List<PaymentInfo> findPaymentSumByStudent(String id) throws IllegalArgumentException{
//		Student student = studentServiceImpl.findById(id);
//		return findPaymentSumByStudent(student, student.getSchool().getSchoolYear(), null);
//	}
	public List<PayablesDto> findPaymentByStudent(Student student, CodeGroups period) {
		return payablesMapper.toDtos(((PayablesMongoRepository) repo).findByStudentAndPeriod(student, period));
	}

	public List<PaymentInfo> findPaymentSumByStudent(Student student, CodeGroups period, boolean isProcess) {
		return findPaymentSumByStudent(student, period, null, isProcess);
	}

	public List<PaymentInfo> findPaymentSumByStudent(Student student, CodeGroups period, String invoiceNo) {
		return findPaymentSumByStudent(student, period, invoiceNo, false);
	}

	public List<PaymentInfo> findPaymentSumByStudent(Student student, CodeGroups period, String invoiceNo,
			boolean isProcess) {
		Criteria filter = Criteria.where("student").is(student).and("period").is(period);
		if (!StringUtils.isBlank(invoiceNo)) {
			filter.and("invoiceNo").is(invoiceNo);
		}
		if (isProcess) {
			filter.and("statusCode").is(Constants.PROCESS_STATUS_PROCESSING);
		}

		AggregationOperation match = match(filter);

		List<PaymentInfo> list = new ArrayList<PaymentInfo>();
		Aggregation aggregation = newAggregation(match,
				group("student", "order", "code", "name").sum("payment").as("payment"),
				sort(Sort.Direction.ASC, previousOperation(), "order"),
				project("student", "order", "code", "name", "payment"));
		AggregationResults<PaymentInfo> groupResults = mongoTemplate.aggregate(aggregation, Payables.class,
				PaymentInfo.class);
		list = groupResults.getMappedResults();
		return list;
	}

	public void updateStudentPayablesStatus(Student student, CodeGroups period, String status) {
		Criteria filter = Criteria.where("student").is(student).and("period").is(period);
		Query query = new Query(filter);

		Update update = new Update();
		update.set("statusCode", status);
		mongoTemplate.updateMulti(query, update, Payables.class);
		mongoTemplate.updateMulti(query, update, PayablesOld.class);
	}

	public BillingByInvoice getBillingByInvoiceList(Student student, String periodId)
			throws GradeLevelPayablesResponseException {
		CodeGroups period = codeGroupsServiceImpl.findById(periodId);

		GradeLevelPayables gradeLevelPayables = gradeLevelPayablesServiceImpl.findByLevelAndPeriod(student.getLevel(),
				period, student.getSchool());
		List<PayablesDto> payments = findPaymentByStudent(student, period);
		payments.sort(Comparator.comparing(PayablesDto::getInvoiceDate, Collections.reverseOrder()));

		Map<String, Invoice> mapper = new HashMap<>();
		List<Invoice> invoiceList = new ArrayList<>();
		for (PayablesDto payables : payments) {
			String invoiceNo = payables.getInvoiceNo();
			Invoice invoice = mapper.get(invoiceNo);
			if (invoice == null) {
				invoice = new Invoice(invoiceNo, payables.getInvoiceDate(), new HashMap<String, PayablesDto>());
				mapper.put(invoiceNo, invoice);
				invoiceList.add(invoice);
			}
			invoice.getPayablesMap().put(payables.getCode(), payables);
		}
		
		List<AccountPayablesSettings> accountPayablesSettings = gradeLevelPayables.getAccountPayablesSettings();
		Payables paymentBalance = getPaymentBalanceTmpl(student, period);
		accountPayablesSettings.add(paymentBalance.getAps());
		log.info("accountPayablesSettings={}", accountPayablesSettings);

		List<AccountPayablesSettingsDto> acctPayablesList = accountPayablesSettingsMapper
				.toDtos(accountPayablesSettings);

		log.info("acctPayablesList.size={}", acctPayablesList.size());
		

		Collections.sort(acctPayablesList);
		return new BillingByInvoice(acctPayablesList, invoiceList);
	}

	@Override
	public PayablesDto toDto(Payables entity) {
		return payablesMapper.toDto(entity);
	}

	@Override
	public Payables toEntity(PayablesDto dto) {
		return payablesMapper.toEntity(dto);
	}

	@Override
	public Page<PayablesDto> toDto(Page<Payables> page) {
		Page<PayablesDto> newpage = new PageImpl<PayablesDto>(payablesMapper.toDtos(page.getContent()),
				page.getPageable(), page.getTotalElements());
		return newpage;
	}

	@Override
	public PayablesDto saveDto(PayablesDto dto, School school) {
		Payables entity = toEntity(dto);
		if (StringUtils.isBlank(entity.getId())) {
			String id = sequenceGeneratorService.nextSeq(Payables.SEQUENCE_NAME);
			entity.setId(id);
		}
		entity.setStatusCode(Constants.PROCESS_STATUS_CREATED);
		return super.save(entity, school);
	}

	public void processPayables(Processing processing, CodeGroups fromPeriod, CodeGroups toPeriod, School school)
			throws ClosePeriodException, GradeLevelPayablesResponseException {
		// copy payables to payablesold and mark with 'P' for processing
		List<PayablesOld> payables = clonePayablesToPayablesOld(school, fromPeriod);
		payablesOldMongoRepository.saveAll(payables);

		// get all student
		List<Student> students = studentServiceImpl.findAll(school);

		// process each student
		for (Student s : students) {
			updateStudentPayablesStatus(s, fromPeriod, Constants.PROCESS_STATUS_PROCESSING);

			// get student payables marked with processing
			List<Payables> list = getStudentPayables(s, fromPeriod, null, true);

			// only get payables with balance
			List<Payables> studentPayablesFiltered = list.stream().filter(p -> p.getBalance() != 0)
					.collect(Collectors.toList());

			// set payables period to next period
			for (Payables p : studentPayablesFiltered) {
				p.setPeriod(toPeriod);
			}
			List<PaymentBalance> bals = payablesMapper.toBal(studentPayablesFiltered);
			// save balance
			paymentBalanceRepository.saveAll(bals);

			// update payables process status
			updateStudentPayablesStatus(s, fromPeriod, Constants.PROCESS_STATUS_COMPLETED);
			// delete processed payables
			payablesMongoRepository.deleteByStudentAndStatusCode(s, Constants.PROCESS_STATUS_PROCESSING);
		}
		updateCurrentPeriod(toPeriod, school);
	}

	private void updateCurrentPeriod(CodeGroups toPeriod, School school) {
		school.setCurrentPeriod(toPeriod);
		schoolServiceImpl.save(school);
	}

	private List<PayablesOld> clonePayablesToPayablesOld(School school, CodeGroups fromPeriod)
			throws ClosePeriodException {
		Query query = new Query(Criteria.where("period").is(fromPeriod).and("school").is(school));
		long count = mongoTemplate.count(query, Payables.class);
		if (count == 0) {
			throw new ClosePeriodException(
					String.format("No records found from period: %s", fromPeriod.getDescription()));
		}

		Update update = new Update();
		update.set("statusCode", Constants.PROCESS_STATUS_PENDING);
		mongoTemplate.updateMulti(query, update, Payables.class);

		query = new Query(Criteria.where("period").is(fromPeriod).and("school").is(school).and("statusCode")
				.is(Constants.PROCESS_STATUS_PENDING));
		// long pendingCount = mongoTemplate.count(query, Payables.class);

		List<Payables> payables = payablesMongoRepository.findBySchoolAndPeriodAndStatusCode(school, fromPeriod,
				Constants.PROCESS_STATUS_PENDING);

		return payablesMapper.toOld(payables);
	}

	public PaymentBalanceResponse getPaymentBalanceByStudent(Student student, String periodId) {
		CodeGroups period = codeGroupsServiceImpl.findById(periodId);
		List<PaymentBalance> paymentBalances = paymentBalanceRepository.findByStudentAndPeriodOrderByOrder(student,
				period);
		return new PaymentBalanceResponse(paymentBalanceMapper.toDtos(paymentBalances));
	}
}
