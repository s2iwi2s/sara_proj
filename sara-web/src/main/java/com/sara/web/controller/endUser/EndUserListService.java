package com.sara.web.controller.endUser;

import java.util.List;

import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.service.impl.SchoolServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EndUserListService implements ListService<User> {

	private List<School> schoolList = null;

	public EndUserListService(UserServiceImpl userServiceImpl, SchoolServiceImpl schoolServiceImpl) {
		schoolList = schoolServiceImpl.findAll();
		// statusList = codeGroupsService.findByCode("STATUS");
	}
}
