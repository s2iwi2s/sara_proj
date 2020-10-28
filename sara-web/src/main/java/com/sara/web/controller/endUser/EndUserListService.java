package com.sara.web.controller.endUser;

import java.util.List;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.User;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EndUserListService implements ListService<User> {

	private List<CodeGroups> statusList = null;

	public EndUserListService(UserServiceImpl endUserListService) {
		// statusList = codeGroupsService.findByCode("STATUS");
	}
}
