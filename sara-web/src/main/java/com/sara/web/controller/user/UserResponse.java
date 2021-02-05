package com.sara.web.controller.user;

import com.sara.service.dtos.UserDto;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse extends Response<UserDto> {

	public UserResponse(UserListService userListService) {
		super(userListService); 
	}
}
