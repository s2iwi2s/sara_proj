package com.sara.web.controller.school;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.service.dtos.SchoolDto;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.SchoolServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.common.Constants;
import com.sara.web.controller.AbstractCrudController;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + SchoolController.URL_BASE)
public class SchoolController extends AbstractCrudController<School, SchoolDto, String> {

	public static final String URL_BASE = "/school";

	private SchoolServiceImpl schoolServiceImpl;

	public SchoolController(UserServiceImpl userServiceImpl, CodeGroupsServiceImpl codeGroupsServiceImpl,
			SchoolServiceImpl schoolServiceImpl) {
		super(userServiceImpl, codeGroupsServiceImpl);
		this.schoolServiceImpl = schoolServiceImpl;
	}

	@Override
	public SchoolServiceImpl getService() {
		return schoolServiceImpl;
	}

	@Override
	public SchoolResponse getResponse(User user) {
		return new SchoolResponse(new SchoolListService(codeGroupsServiceImpl, user.getSchool()));
	}

}
