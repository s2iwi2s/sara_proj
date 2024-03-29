package com.sara.web.controller.user;

import java.util.List;

import com.sara.data.document.School;
import com.sara.service.impl.SchoolServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserListService implements ListService {

	private List<School> schoolList = null;

	public UserListService(SchoolServiceImpl schoolServiceImpl) {
		schoolList = schoolServiceImpl.findAll();
		// statusList = codeGroupsService.findByCode("STATUS");
	}
}
