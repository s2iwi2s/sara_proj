package com.sara.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.GradeLevelPayables;
import com.sara.data.document.User;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.GradeLevelPayablesServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.common.Constants;
import com.sara.web.controller.gradeLevelPayables.GradeLevelPayablesListService;
import com.sara.web.controller.gradeLevelPayables.GradeLevelPayablesResponse;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + GradeLevelPayablesController.URL_BASE)
public class GradeLevelPayablesController extends AbstractCrudController<GradeLevelPayables, String> {

	private static final Logger log = LoggerFactory.getLogger(GradeLevelPayablesController.class);

	public static final String URL_BASE = "/gradeLevelPayables";

	private GradeLevelPayablesServiceImpl gradeLevelPayablesServiceImpl;

	public GradeLevelPayablesController(UserServiceImpl userServiceImpl, CodeGroupsServiceImpl codeGroupsServiceImpl,
			GradeLevelPayablesServiceImpl gradeLevelPayablesServiceImpl) {
		super(userServiceImpl, codeGroupsServiceImpl);
		this.gradeLevelPayablesServiceImpl = gradeLevelPayablesServiceImpl;
	}

	@Override
	public GradeLevelPayablesServiceImpl getService() {
		return gradeLevelPayablesServiceImpl;
	}

	@Override
	public GradeLevelPayablesResponse getResponse(User user) {
		return new GradeLevelPayablesResponse(new GradeLevelPayablesListService(codeGroupsServiceImpl, user.getSchool()));
	}

}
