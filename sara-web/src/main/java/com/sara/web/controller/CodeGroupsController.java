package com.sara.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.User;
import com.sara.service.dtos.CodeGroupsDto;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.common.Constants;
import com.sara.web.controller.codeGroups.CodeGroupsListService;
import com.sara.web.controller.codeGroups.CodeGroupsResponse;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + CodeGroupsController.URL_BASE)
public class CodeGroupsController extends AbstractCrudController<CodeGroups, CodeGroupsDto, String> {

	public static final String URL_BASE = "/codeGroups";

	public CodeGroupsController(UserServiceImpl userServiceImpl, CodeGroupsServiceImpl codeGroupsServiceImpl) {
		super(userServiceImpl, codeGroupsServiceImpl);
	}

	@Override
	public CodeGroupsServiceImpl getService() {
		return codeGroupsServiceImpl;
	}

	@Override
	public CodeGroupsResponse getResponse(User user) {
		return new CodeGroupsResponse(new CodeGroupsListService(codeGroupsServiceImpl, user.getSchool()));
	}

}
