package com.sara.web.controller.gradeLevelPayables;

import java.util.List;

import com.sara.data.document.School;
import com.sara.service.dtos.AccountPayablesSettingsDto;
import com.sara.service.dtos.CodeGroupsDto;
import com.sara.service.impl.AccountPayablesSettingsServiceImpl;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GradeLevelPayablesListService implements ListService {

	private List<CodeGroupsDto> levelList = null;
	private List<AccountPayablesSettingsDto> applyToAllList = null;
	private List<CodeGroupsDto> periodList = null;

	public GradeLevelPayablesListService(CodeGroupsServiceImpl codeGroupsServiceImpl, AccountPayablesSettingsServiceImpl accountPayablesSettingsServiceImpl, School school) {
		levelList = codeGroupsServiceImpl.findByCodeList("STUDENT_LEVEL", school);
		periodList = codeGroupsServiceImpl.findByCodeList("PERIOD", school);
	}
}
