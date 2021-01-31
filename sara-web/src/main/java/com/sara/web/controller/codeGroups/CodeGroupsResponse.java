package com.sara.web.controller.codeGroups;

import java.util.ArrayList;

import com.sara.data.document.User;
import com.sara.service.dtos.CodeGroupsDto;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CodeGroupsResponse extends Response<CodeGroupsDto> {
	Iterable<User> list = new ArrayList<User>();

	public CodeGroupsResponse(CodeGroupsListService codeGroupsListService) {
		super(codeGroupsListService); 
	}
}
