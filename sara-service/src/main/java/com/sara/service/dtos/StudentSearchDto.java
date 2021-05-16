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
	

	public String getFullName() {
		return lastName + ", " + firstName;
	}

	@Override
	public String toString() {
		return "StudentSearchDto{" +
				"id='" + id + '\'' +
				", lrn='" + lrn + '\'' +
				", firstName='" + firstName + '\'' +
				", lastName='" + lastName + '\'' +

				", fullName='" + getFullName() + '\'' +

				", gender='" + gender + '\'' +
				", level=" + level +
				", school=" + school +
				'}';
	}
}
