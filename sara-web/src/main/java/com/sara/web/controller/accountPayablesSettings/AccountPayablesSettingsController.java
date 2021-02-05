package com.sara.web.controller.accountPayablesSettings;

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
import com.sara.service.dtos.AccountPayablesSettingsDto;
import com.sara.service.exception.NotFoundException;
import com.sara.service.impl.AccountPayablesSettingsServiceImpl;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.common.Constants;
import com.sara.web.common.Response;
import com.sara.web.common.UserUtil;
import com.sara.web.controller.AbstractCrudController;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + AccountPayablesSettingsController.URL_BASE)
public class AccountPayablesSettingsController
		extends AbstractCrudController<AccountPayablesSettings, AccountPayablesSettingsDto, String> {

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

	@GetMapping(Constants.URL_LIST + "/period/{periodId}")
	public ResponseEntity<?> listByPeriod(@PathVariable("periodId") String periodId,
			@RequestParam("searchValue") String searchValue, @PageableDefault(sort = {
					"id" }, direction = Direction.ASC, page = Constants.DEFAULT_PAGE_NUMBER, size = Constants.DEFAULT_PAGE_SIZE) Pageable pageable) {
		log.info("[listByPeriod] periodId={}", periodId);
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		Response<AccountPayablesSettingsDto> res = getResponse(user);
		res.setSearchValue(searchValue);

		Page<AccountPayablesSettingsDto> pagingList = null;
		pagingList = getService().findAll(periodId, searchValue, pageable, user);

		res.setPagingList(pagingList);
		res.setListService(null);
		return new ResponseEntity<Response<AccountPayablesSettingsDto>>(res, HttpStatus.OK);
	}

	@GetMapping(Constants.URL_LIST + "/active/{periodId}")
	public ResponseEntity<?> getExceptApplyToAllList(@PathVariable("periodId") String periodId,
			@RequestParam("searchValue") String searchValue,
			@PageableDefault(sort = {
					"id" }, direction = Direction.ASC, page = Constants.DEFAULT_PAGE_NUMBER, size = Constants.DEFAULT_PAGE_SIZE) Pageable pageable)
			throws NotFoundException {
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		Response<AccountPayablesSettingsDto> res = getResponse(user);
		res.setSearchValue(searchValue);

		Page<AccountPayablesSettingsDto> pagingList = null;

		pagingList = getService().findAllActiveList(periodId, searchValue, pageable, user);

		res.setPagingList(pagingList);
		res.setListService(null);
		return new ResponseEntity<Response<AccountPayablesSettingsDto>>(res, HttpStatus.OK);
	}
}
