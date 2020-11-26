package com.sara.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.AccountPayablesSettings;
import com.sara.data.document.User;
import com.sara.service.impl.AccountPayablesSettingsServiceImpl;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.common.Constants;
import com.sara.web.controller.accountPayablesSettings.AccountPayablesSettingsListService;
import com.sara.web.controller.accountPayablesSettings.AccountPayablesSettingsResponse;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + AccountPayablesSettingsController.URL_BASE)
public class AccountPayablesSettingsController extends AbstractCrudController<AccountPayablesSettings, String> {

	private static final Logger log = LoggerFactory.getLogger(AccountPayablesSettingsController.class);

	public static final String URL_BASE = "/accountPayablesSettings";

	private AccountPayablesSettingsServiceImpl accountPayablesService;

	public AccountPayablesSettingsController(UserServiceImpl userServiceImpl,
			CodeGroupsServiceImpl codeGroupsServiceImpl, AccountPayablesSettingsServiceImpl accountPayablesService) {
		super(userServiceImpl, codeGroupsServiceImpl);
		this.accountPayablesService = accountPayablesService;
	}

	@Override
	public AccountPayablesSettingsServiceImpl getService() {
		return accountPayablesService;
	}

	@Override
	public AccountPayablesSettingsResponse getResponse(User user) {
		return new AccountPayablesSettingsResponse(
				new AccountPayablesSettingsListService(codeGroupsServiceImpl, user.getSchool()));
	}

}
