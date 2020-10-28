package com.sara.web.controller.codeGroups;

import java.util.ArrayList;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.User;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CodeGroupsResponse extends Response<CodeGroups> {
	private static final long serialVersionUID = -1164423995409192025L;
	Iterable<User> list = new ArrayList<User>();

	public CodeGroupsResponse(CodeGroupsListService codeGroupsListService) {
		super(codeGroupsListService); 
	}
}
