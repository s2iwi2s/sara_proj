package com.sara.web.controller.gradeLevelPayables;

import java.util.List;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.GradeLevelPayables;
import com.sara.data.document.School;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GradeLevelPayablesListService implements ListService<GradeLevelPayables> {

	private List<CodeGroups> levelList = null;

	public GradeLevelPayablesListService(CodeGroupsServiceImpl codeGroupsServiceImpl, School school) {
		levelList = codeGroupsServiceImpl.findByCodeList("STUDENT_LEVEL", school);
	}
}
