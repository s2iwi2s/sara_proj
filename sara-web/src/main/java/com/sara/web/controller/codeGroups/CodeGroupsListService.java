package com.sara.web.controller.codeGroups;

import java.util.List;

import com.sara.data.document.CodeGroups;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CodeGroupsListService implements ListService<CodeGroups> {

	private List<CodeGroups> statusList = null;

	public CodeGroupsListService(CodeGroupsServiceImpl codeGroupsListService) {
		// statusList = codeGroupsService.findByCode("STATUS");
	}
}
