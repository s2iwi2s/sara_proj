package com.sara.web.controller.codeGroups;

import java.util.List;

import com.sara.data.document.School;
import com.sara.service.dtos.CodeGroupsDto;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CodeGroupsListService implements ListService {

	private List<CodeGroupsDto> statusList = null;

	public CodeGroupsListService(CodeGroupsServiceImpl codeGroupsListService, School school) {
//		statusList = codeGroupsListService.findByCodeDto("code", school);
	}
}
