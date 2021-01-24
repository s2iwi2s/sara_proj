package com.sara.web.controller.school;

import java.util.List;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.School;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SchoolListService implements ListService<School> {

	private List<CodeGroups> periodList = null;

	public SchoolListService(CodeGroupsServiceImpl codeGroupsServiceImpl, School school) {
		periodList = codeGroupsServiceImpl.findByCodeList("PERIOD", school);
	}
}
