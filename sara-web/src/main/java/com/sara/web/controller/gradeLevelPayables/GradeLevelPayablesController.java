package com.sara.web.controller.gradeLevelPayables;

import java.util.ArrayList;
import java.util.List;

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

import com.sara.data.document.GradeLevelPayables;
import com.sara.data.document.User;
import com.sara.service.dtos.AccountPayablesSettingsDto;
import com.sara.service.dtos.GradeLevelPayablesDto;
import com.sara.service.impl.AccountPayablesSettingsServiceImpl;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.GradeLevelPayablesServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.common.Constants;
import com.sara.web.common.Response;
import com.sara.web.common.UserUtil;
import com.sara.web.controller.AbstractCrudController;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + GradeLevelPayablesController.URL_BASE)
public class GradeLevelPayablesController extends AbstractCrudController<GradeLevelPayables,GradeLevelPayablesDto, String> {

	private static final Logger log = LoggerFactory.getLogger(GradeLevelPayablesController.class);

	public static final String URL_BASE = "/gradeLevelPayables";

	private GradeLevelPayablesServiceImpl gradeLevelPayablesServiceImpl;
	private AccountPayablesSettingsServiceImpl accountPayablesSettingsServiceImpl;

	public GradeLevelPayablesController(UserServiceImpl userServiceImpl, CodeGroupsServiceImpl codeGroupsServiceImpl,
			GradeLevelPayablesServiceImpl gradeLevelPayablesServiceImpl,
			AccountPayablesSettingsServiceImpl accountPayablesSettingsServiceImpl) {
		super(userServiceImpl, codeGroupsServiceImpl);
		this.gradeLevelPayablesServiceImpl = gradeLevelPayablesServiceImpl;
		this.accountPayablesSettingsServiceImpl = accountPayablesSettingsServiceImpl;
	}

	@Override
	public GradeLevelPayablesServiceImpl getService() {
		return gradeLevelPayablesServiceImpl;
	}

	@Override
	public GradeLevelPayablesResponse getResponse(User user) {
		return new GradeLevelPayablesResponse(new GradeLevelPayablesListService(codeGroupsServiceImpl,
				accountPayablesSettingsServiceImpl, user.getSchool()));
	}

	@GetMapping(Constants.URL_OPTIONS + "/period/{periodId}")
	public ResponseEntity<?> optionsByPeriod(@PathVariable("periodId") String periodId) {
		log.debug("periodId=>{}", periodId);
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		GradeLevelPayablesResponse res = getResponse(user);
		List<AccountPayablesSettingsDto> applyToAllList = new ArrayList<AccountPayablesSettingsDto>();
		if (!"-1".equals(periodId)) {
			applyToAllList = accountPayablesSettingsServiceImpl.findByApplyToAllList(user.getSchool(), periodId);
		}
		GradeLevelPayablesListService listService = (GradeLevelPayablesListService) res.getListService();
		listService.setApplyToAllList(applyToAllList);


		return new ResponseEntity<Response<GradeLevelPayablesDto>>(res, HttpStatus.OK);
	}


	@GetMapping(Constants.URL_LIST + "/period/{periodId}")
	public ResponseEntity<?> listByPeriod(@PathVariable("periodId") String periodId,
			@RequestParam("searchValue") String searchValue, @PageableDefault(sort = {
					"id" }, direction = Direction.ASC, page = Constants.DEFAULT_PAGE_NUMBER, size = Constants.DEFAULT_PAGE_SIZE) Pageable pageable) {
		log.info("[listByPeriod] periodId={}", periodId);
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		Response<GradeLevelPayablesDto> res = getResponse(user);
		res.setSearchValue(searchValue);

		Page<GradeLevelPayablesDto> pagingList = null;
		pagingList = getService().findAll(periodId, searchValue, pageable, user);

		res.setPagingList(pagingList);
		res.setListService(null);
		return new ResponseEntity<Response<GradeLevelPayablesDto>>(res, HttpStatus.OK);
	}
}
