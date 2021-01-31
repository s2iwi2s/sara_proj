package com.sara.service.dtos;

import org.springframework.data.annotation.Transient;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentSearchDto {
	@Transient
	private String id;

	private String lrn;

	private String firstName;
	private String gender;
	private String lastName;

	private CodeGroupsDto level;
	private SchoolDto school;
}
