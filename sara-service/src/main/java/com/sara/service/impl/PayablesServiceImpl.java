package com.sara.service.impl;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.previousOperation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
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
import com.sara.data.document.QCodeGroups;
import com.sara.data.document.QPayables;
import com.sara.data.document.Student;
import com.sara.data.document.User;
import com.sara.data.repository.PayablesMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;
import com.sara.service.bean.PaymentInfo;

@Service
public class PayablesServiceImpl extends AbstractService<Payables, String> {

	private static final Logger log = LoggerFactory.getLogger(PayablesServiceImpl.class);

	private PayablesMongoRepository repository;

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
		this.repository = repo;
	}
	
	@Override
	public BooleanExpression getFindAllBooleanExpression(User user) {
		return QPayables.payables.student.school.eq(user.getSchool());
	}

	public Page<Payables> findAll(Pageable pageable) {
		return repository.findAll(pageable);
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

	public List<Payables> savePayables(List<Payables> list, Student student) throws Exception {
		double remainingAmt = 0;
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
		}

		if (remainingAmt > 0) {
			list.add(new Payables("balance", "Balance", 0, -(remainingAmt), list.size(), student, 0, 0));
		}

		this.save(list);

		List<Payables> payables = getStudentPayables(student);

		return payables;
	}

	public List<Payables> getStudentPayables(String id) throws JsonMappingException, JsonProcessingException {
		Student student = studentServiceImpl.findById(id);
		return getStudentPayables(student);
	}

	public List<Payables> getStudentPayables(Student student) throws JsonMappingException, JsonProcessingException {
		List<Payables> payables = getStudentPayablesTemplate(student);

		List<PaymentInfo> sumPayableList = findPaymentSumByStudent(student);

		log.debug("PaymentInfo sumPayableList=>{}", sumPayableList);

		for (Payables entity : payables) {
			boolean hasPayment = false;
			for (PaymentInfo sumEntity : sumPayableList) {
				if (entity.getCode().equals(sumEntity.getCode())) {
					double payment = entity.getPaid() + sumEntity.getPayment();
					entity.setPaid(payment);
					entity.setBalance(entity.getAmount() - payment);
					entity.setPayment(0);
					hasPayment = true;
					break;
				}
			}
			if (!hasPayment) {
				//entity.setBalance(entity.getAmount());
			}
		}

		Optional<PaymentInfo> balPayable = sumPayableList.stream().filter(p -> {
			return p.getCode().equals("balance");
		}).findFirst();
		log.debug("balPayable=>{}", balPayable);
		log.debug("balPayable.isPresent()=>{}", balPayable.isPresent());
		if (balPayable.isPresent()) {
			PaymentInfo payInfo = balPayable.get();
			payables.add(new Payables(payInfo.getCode(), payInfo.getName(), 0, payInfo.getPayment(), payables.size(),
					student, 0, 0));
		}

		return payables;
	}

	public List<Payables> getStudentPayablesTemplate(String id) throws JsonMappingException, JsonProcessingException {
		Student student = studentServiceImpl.findById(id);
		return getStudentPayablesTemplate(student);
	}

	public List<Payables> getStudentPayablesTemplate(Student student)
			throws JsonMappingException, JsonProcessingException {
		
		CodeGroups payables = codeGroupsServiceImpl.findByCode("PAYABLES_" + student.getLevel().getValue(), student.getSchool());

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

	private List<Payables> save(List<Payables> list) {
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
			}
		}
		return repository.saveAll(list);
	}

	public List<PaymentInfo> findPaymentSumByStudent(String id) {
		Student student = studentServiceImpl.findById(id);
		return findPaymentSumByStudent(student);
	}

	public List<PaymentInfo> findPaymentSumByStudent(Student student) {
		Aggregation aggregation = newAggregation(match(Criteria.where("student").is(student)),
				group("code", "name", "order").sum("payment").as("payment"),
				sort(Sort.Direction.ASC, previousOperation(), "order"), project("code", "name", "order", "payment"));

		AggregationResults<PaymentInfo> groupResults = mongoTemplate.aggregate(aggregation, Payables.class,
				PaymentInfo.class);
		List<PaymentInfo> list = groupResults.getMappedResults();
		return list;
	}
}
