package com.sara.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.EndUser;
import com.sara.service.impl.EndUserServiceImpl;
import com.sara.web.common.Constants;
import com.sara.web.controller.endUser.EndUserListService;
import com.sara.web.controller.endUser.EndUserResponse;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + EndUserController.URL_BASE)
public class EndUserController extends AbstractCrudController<EndUser, String> {
	public static final String URL_BASE = "/endUser";

	public EndUserController() {
	}

	@Autowired
	private EndUserServiceImpl endUserService;

//	@Autowired
//	private CodeGroupsServiceImpl codeGroupsService;

	@Override
	public EndUserServiceImpl getService() {
		return endUserService;
	}

	@Override
	public EndUserResponse getResponse() {
		return new EndUserResponse(new EndUserListService(endUserService));
	}

}
