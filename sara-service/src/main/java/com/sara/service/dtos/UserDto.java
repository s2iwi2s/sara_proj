package com.sara.service.dtos;

import com.sara.data.document.School;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class UserDto {
	private String id;
	private String userName;
	private String lastName;
	private String firstName;
	private School school;
}
