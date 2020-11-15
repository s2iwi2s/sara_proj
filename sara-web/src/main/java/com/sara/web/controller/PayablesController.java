package com.sara.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

import com.sara.data.document.Payables;
import com.sara.data.document.Student;
import com.sara.data.document.User;
import com.sara.service.bean.StudentPayables;
import com.sara.service.impl.PayablesServiceImpl;
import com.sara.service.impl.StudentServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.common.Constants;
import com.sara.web.common.UserUtil;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + PayablesController.URL_BASE)
public class PayablesController {

	private static final Logger log = LoggerFactory.getLogger(PayablesController.class);

	public static final String URL_BASE = "/billing";

	@Autowired
	private PayablesServiceImpl payablesServiceImpl;

	@Autowired
	private UserServiceImpl userServiceImpl;

	@Autowired
	private StudentServiceImpl studentServiceImpl;

	@GetMapping(Constants.URL_BILLING_USER_SEARCH)
	public ResponseEntity<Page<Student>> search(@PathVariable("by") String by,
			@RequestParam("searchValue") String searchValue, @PageableDefault(sort = { "lastName",
					"firstName" }, direction = Direction.ASC, page = Constants.DEFAULT_PAGE_NUMBER, size = Constants.DEFAULT_PAGE_SIZE) Pageable pageable) {
		log.debug("by={}, searchValue={}", by, searchValue);

		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		
		Page<Student> list = studentServiceImpl.findAllBy(by, searchValue, pageable, user.getSchool());
		ResponseEntity<Page<Student>> responseEntity = new ResponseEntity<Page<Student>>(list, HttpStatus.OK);
		return responseEntity;
	}

	@GetMapping(path = Constants.URL_BILLING_USER_PAYABLES, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, ?>> payables(@PathVariable("id") String id) throws Exception {
		Map<String, Object> map = new HashMap<>();

		Student student = studentServiceImpl.findById(id);
		map.put("student", student);

		List<Payables> payables = payablesServiceImpl.getStudentPayables(student);

		StudentPayables studentPayables = new StudentPayables(payables);
		map.put("studentPayables", studentPayables);

		ResponseEntity<Map<String, ?>> responseEntity = new ResponseEntity<>(map, HttpStatus.OK);
		return responseEntity;
	}

	@PostMapping(path = Constants.URL_SAVE + "/{id}")
	public ResponseEntity<Map<String, ?>> savePayables(@RequestBody List<Payables> payableList,
			@PathVariable("id") String id) throws Exception {
		log.debug("payableList=>{}", payableList);
		
		Map<String, Object> map = new HashMap<>();
		
		Student student = studentServiceImpl.findById(id);
		map.put("student", student);

		StudentPayables studentPayables = payablesServiceImpl.savePayables(payableList, student);
		map.put("studentPayables", studentPayables);

		ResponseEntity<Map<String, ?>> responseEntity = new ResponseEntity<>(map, HttpStatus.OK);
		return responseEntity;
	}

}
