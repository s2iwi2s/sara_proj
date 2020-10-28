package com.sara.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.User;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.common.Constants;
import com.sara.web.controller.endUser.EndUserListService;
import com.sara.web.controller.endUser.EndUserResponse;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + UserController.URL_BASE)
public class UserController extends AbstractCrudController<User, String> {
	public static final String URL_BASE = "/user";

	public UserController() {
	}

	@Autowired
	private UserServiceImpl endUserService;

//	@Autowired
//	private CodeGroupsServiceImpl codeGroupsService;

	@Override
	public UserServiceImpl getService() {
		return endUserService;
	}

	@Override
	public EndUserResponse getResponse() {
		return new EndUserResponse(new EndUserListService(endUserService));
	}

}
