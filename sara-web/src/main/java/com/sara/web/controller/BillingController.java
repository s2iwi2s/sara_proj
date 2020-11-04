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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.Student;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.StudentServiceImpl;
import com.sara.web.beans.Payables;
import com.sara.web.common.Constants;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + BillingController.URL_BASE)
public class BillingController {
	
	private static final Logger log = LoggerFactory.getLogger(BillingController.class);

	public static final String URL_BASE = "/billing";

	@Autowired
	private StudentServiceImpl studentServiceImpl;
	
	@Autowired
	private CodeGroupsServiceImpl codeGroupsServiceImpl;
	
	@GetMapping(Constants.URL_BILLING_USER_SEARCH)
	public ResponseEntity<Page<Student>> search(@PathVariable("by") String by, @RequestParam("searchValue") String searchValue,
			@PageableDefault(sort = {
					"lastName", "firstName" }, direction = Direction.ASC, page = Constants.DEFAULT_PAGE_NUMBER, size = Constants.DEFAULT_PAGE_SIZE) Pageable pageable) {
		log.debug("by={}, searchValue={}", by, searchValue);
		Page<Student> list = studentServiceImpl.findAllBy(by, searchValue, pageable);
		ResponseEntity<Page<Student>> responseEntity = new ResponseEntity<Page<Student>>(list, HttpStatus.OK);
		return responseEntity;
	}
	
	@GetMapping(path=Constants.URL_BILLING_USER_PAYABLES, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, ?>> payables(@PathVariable("id") String id) throws Exception {
		Map<String, Object> map = new HashMap<>();

		Student student = studentServiceImpl.findById(id);
		map.put("student", student);
		
		CodeGroups payables = codeGroupsServiceImpl.findByCode("PAYABLES_" + student.getLevel().getValue());
		log.debug("payables=>{}", payables);
		ObjectMapper mapper = new ObjectMapper();
		CollectionType javaType = mapper.getTypeFactory()
			      .constructCollectionType(List.class, Payables.class);
		List<Payables> payableList = mapper.readValue(payables.getJson(), javaType);
		map.put("payables", payableList);
		
		log.debug("map=>{}", map);
		ResponseEntity<Map<String, ?>> responseEntity = new ResponseEntity<>(map, HttpStatus.OK);
		return responseEntity;
	}

}
