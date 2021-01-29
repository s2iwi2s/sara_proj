package com.sara.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.AccountPayablesSettings;
import com.sara.data.document.GradeLevelPayables;
import com.sara.data.document.User;
import com.sara.service.impl.AccountPayablesSettingsServiceImpl;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.GradeLevelPayablesServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.beans.ResponseStatus;
import com.sara.web.common.Constants;
import com.sara.web.common.Response;
import com.sara.web.common.UserUtil;
import com.sara.web.controller.gradeLevelPayables.GradeLevelPayablesListService;
import com.sara.web.controller.gradeLevelPayables.GradeLevelPayablesResponse;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + GradeLevelPayablesController.URL_BASE)
public class GradeLevelPayablesController extends AbstractCrudController<GradeLevelPayables, String> {

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
		GradeLevelPayables entity = null;
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		ResponseStatus status = new ResponseStatus();
		Response<GradeLevelPayables> res = getResponse(user);
		List<AccountPayablesSettings> applyToAllList = new ArrayList<AccountPayablesSettings>();
		if (!"-1".equals(periodId)) {
			applyToAllList = accountPayablesSettingsServiceImpl.findByApplyToAllList(user.getSchool(), periodId);
		}
		GradeLevelPayablesListService listService = (GradeLevelPayablesListService) res.getListService();
		listService.setApplyToAllList(applyToAllList);

		res.setResponseStatus(status);

		try {
			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setException(e);
		}

		res.setEntity(entity);

		return new ResponseEntity<Response<GradeLevelPayables>>(res, HttpStatus.OK);
	}
}
