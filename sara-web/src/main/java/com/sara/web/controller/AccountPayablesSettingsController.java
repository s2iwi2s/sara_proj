package com.sara.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.AccountPayablesSettings;
import com.sara.data.document.User;
import com.sara.service.exception.NotFoundException;
import com.sara.service.impl.AccountPayablesSettingsServiceImpl;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.beans.ResponseStatus;
import com.sara.web.common.Constants;
import com.sara.web.common.Response;
import com.sara.web.common.UserUtil;
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

	@GetMapping("/active/{period}")
	public ResponseEntity<?> getExceptApplyToAllList(@PathVariable("period") String period,
			@RequestParam("searchValue") String searchValue, @PageableDefault(sort = {
					"id" }, direction = Direction.ASC, page = Constants.DEFAULT_PAGE_NUMBER, size = Constants.DEFAULT_PAGE_SIZE) Pageable pageable) throws NotFoundException {
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		Response<AccountPayablesSettings> res = getResponse(user);
		ResponseStatus status = new ResponseStatus();
		res.setResponseStatus(status);
		res.setSearchValue(searchValue);

		Page<AccountPayablesSettings> pagingList = null;

		pagingList = getService().findAllActiveList(period, searchValue, pageable, user);
		status.setMessage("SUCCESS!");

		res.setPagingList(pagingList);
		res.setListService(null);
		return new ResponseEntity<Response<AccountPayablesSettings>>(res, HttpStatus.OK);
	}
}
