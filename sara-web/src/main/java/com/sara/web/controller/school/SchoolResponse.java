package com.sara.web.controller.school;

import java.util.ArrayList;

import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SchoolResponse extends Response<School> {
	private static final long serialVersionUID = -1164423995409192025L;
	Iterable<User> list = new ArrayList<User>();

	public SchoolResponse(SchoolListService schoolListService) {
		super(schoolListService); 
	}
}
