package com.sara.web.controller.endUser;

import java.util.List;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.EndUser;
import com.sara.service.impl.AddressServiceImpl;
import com.sara.service.impl.EndUserServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EndUserListService implements ListService<EndUser> {

	private List<CodeGroups> statusList = null;

	public EndUserListService(EndUserServiceImpl endUserListService) {
		// statusList = codeGroupsService.findByCode("STATUS");
	}
}
