package com.sara.web.controller.endUser;

import java.util.ArrayList;

import com.sara.data.document.EndUser;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EndUserResponse extends Response<EndUser> {
	private static final long serialVersionUID = -1164423995409192025L;
	Iterable<EndUser> list = new ArrayList<EndUser>();

	public EndUserResponse(EndUserListService endUserListService) {
		super(endUserListService); 
	}
}
