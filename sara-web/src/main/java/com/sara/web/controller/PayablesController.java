package com.sara.web.controller;

import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.Student;
import com.sara.data.document.User;
import com.sara.service.bean.BillingByInvoice;
import com.sara.service.bean.PaymentBalanceResponse;
import com.sara.service.bean.StudentPayables;
import com.sara.service.dtos.CodeGroupsDto;
import com.sara.service.dtos.PayablesDto;
import com.sara.service.dtos.StudentSearchDto;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.PayablesServiceImpl;
import com.sara.service.impl.StudentServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.service.mappers.StudentMapper;
import com.sara.web.common.Constants;
import com.sara.web.common.UserUtil;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + PayablesController.URL_BASE)
public class PayablesController {

	private static final Logger log = LoggerFactory.getLogger(PayablesController.class);

	public static final String URL_BASE = "/billing";

	private PayablesServiceImpl payablesServiceImpl;

	private UserServiceImpl userServiceImpl;

	private StudentServiceImpl studentServiceImpl;

	private CodeGroupsServiceImpl codeGroupsServiceImpl;
	private StudentMapper studentMapper;

	public PayablesController(PayablesServiceImpl payablesServiceImpl, UserServiceImpl userServiceImpl,
			StudentServiceImpl studentServiceImpl, CodeGroupsServiceImpl codeGroupsServiceImpl,
			StudentMapper studentMapper) {
		this.payablesServiceImpl = payablesServiceImpl;
		this.userServiceImpl = userServiceImpl;
		this.studentServiceImpl = studentServiceImpl;
		this.codeGroupsServiceImpl = codeGroupsServiceImpl;
		this.studentMapper = studentMapper;
	}

	@GetMapping(Constants.URL_BILLING_USER_SEARCH)
	public ResponseEntity<?> search(@PathVariable("by") String by, @RequestParam("searchValue") String searchValue,
			@PageableDefault(sort = { "lastName",
					"firstName" }, direction = Direction.ASC, page = Constants.DEFAULT_PAGE_NUMBER, size = Constants.DEFAULT_PAGE_SIZE) Pageable pageable) {
		log.debug("by={}, searchValue={}", by, searchValue);

		User user = UserUtil.getAuthenticatedUser(userServiceImpl);

		Page<StudentSearchDto> page = studentServiceImpl.findAllBy(by, searchValue, pageable, user.getSchool());
		return new ResponseEntity<>(page, HttpStatus.OK);
	}

	@GetMapping(path = Constants.URL_BILLING_USER_PAYABLES_BY_PERIOD, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, ?>> payablesByPeriod(@PathVariable("id") String id,
			@PathVariable("periodId") String periodId) throws Exception {
		Map<String, Object> map = new HashMap<>();

		StudentSearchDto student = studentServiceImpl.searchByIdDto(id);
		map.put("student", student);

		Student entity = studentMapper.toEntity(student);
		List<PayablesDto> payables = payablesServiceImpl.getStudentPayables(entity, periodId);
		StudentPayables studentPayables = new StudentPayables(payables, new ArrayList<PayablesDto>(), null, null);
		map.put("studentPayables", studentPayables);

		BillingByInvoice billingByInvoice = payablesServiceImpl.getBillingByInvoiceList(entity, periodId);
		map.put("billingByInvoice", billingByInvoice);
		
		PaymentBalanceResponse paymentBalance = payablesServiceImpl.getPaymentBalanceByStudent(entity, periodId);
		map.put("paymentBalance", paymentBalance);

		User user = UserUtil.getAuthenticatedUser(userServiceImpl);

		Map<String, Object> optionsList = new HashMap<>();
		List<CodeGroupsDto> periodList = codeGroupsServiceImpl.findByCodeList("PERIOD", user.getSchool());
		optionsList.put("periodList", periodList);
		map.put("optionsList", optionsList);

		ResponseEntity<Map<String, ?>> responseEntity = new ResponseEntity<>(map, HttpStatus.OK);
		return responseEntity;
	}

	@PostMapping(path = Constants.URL_SAVE + "/{id}/{periodId}/{invoiceDate}")
	public ResponseEntity<Map<String, ?>> savePayables(@RequestBody List<PayablesDto> payableList,
													   @PathVariable("id") String id, @PathVariable("periodId") String periodId,
													   @PathVariable("invoiceDate") Date invoiceDate) throws Exception {
		log.info("savePayables START --");

		log.info("payableList=>{}", payableList);

		Map<String, Object> map = new HashMap<>();
		log.info("savePayables id={}", id);
		StudentSearchDto student = studentServiceImpl.searchByIdDto(id);
		log.info("savePayables student={}", student);

		map.put("student", student);
		try{
			Student entity = studentMapper.toEntity(student);
			StudentPayables studentPayables = payablesServiceImpl.savePayables(payableList, entity, periodId, invoiceDate);
			log.info("savePayables studentPayables={}", studentPayables);
			map.put("studentPayables", studentPayables);

			BillingByInvoice billingByInvoice = payablesServiceImpl.getBillingByInvoiceList(entity, periodId);
			log.info("savePayables billingByInvoice={}", billingByInvoice);
			map.put("billingByInvoice", billingByInvoice);
		} catch(Exception e) {
			e.printStackTrace();
		}

		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		Map<String, Object> optionsList = new HashMap<>();
		List<CodeGroupsDto> periodList = codeGroupsServiceImpl.findByCodeList("PERIOD", user.getSchool());
		optionsList.put("periodList", periodList);
		map.put("optionsList", optionsList);

		log.info("savePayables END --");

		return new ResponseEntity<>(map, HttpStatus.OK);
	}

}
