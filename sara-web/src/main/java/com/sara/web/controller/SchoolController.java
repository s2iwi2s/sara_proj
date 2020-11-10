package com.sara.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.School;
import com.sara.service.impl.SchoolServiceImpl;
import com.sara.web.common.Constants;
import com.sara.web.controller.school.SchoolListService;
import com.sara.web.controller.school.SchoolResponse;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + SchoolController.URL_BASE)
public class SchoolController extends AbstractCrudController<School, String> {
	public static final String URL_BASE = "/school";


	public SchoolController() {
	}

	@Autowired
	private SchoolServiceImpl codeGroupsServiceImpl;

//	@Autowired
//	private SchoolServiceImpl codeGroupsService;

	@Override
	public SchoolServiceImpl getService() {
		return codeGroupsServiceImpl;
	}

	@Override
	public SchoolResponse getResponse() {
		return new SchoolResponse(new SchoolListService(codeGroupsServiceImpl));
	}

}
