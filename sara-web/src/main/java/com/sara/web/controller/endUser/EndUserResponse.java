package com.sara.web.controller.endUser;

import java.util.ArrayList;

import com.sara.data.document.User;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EndUserResponse extends Response<User> {
	private static final long serialVersionUID = -1164423995409192025L;
	Iterable<User> list = new ArrayList<User>();

	public EndUserResponse(EndUserListService endUserListService) {
		super(endUserListService); 
	}
}
