package com.sara.web.controller.endUser;

import com.sara.service.dtos.UserDto;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EndUserResponse extends Response<UserDto> {

	public EndUserResponse(EndUserListService endUserListService) {
		super(endUserListService); 
	}
}
