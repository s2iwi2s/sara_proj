package com.sara.web.controller.school;

import java.util.List;

import com.sara.data.document.School;
import com.sara.service.impl.SchoolServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SchoolListService implements ListService<School> {

	private List<School> statusList = null;

	public SchoolListService(SchoolServiceImpl codeGroupsListService) {
		// statusList = codeGroupsService.findByCode("STATUS");
	}
}
