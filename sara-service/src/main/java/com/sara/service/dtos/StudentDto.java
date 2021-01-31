package com.sara.service.dtos;

import java.util.Date;

import org.springframework.data.annotation.Transient;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentDto {
	@Transient
	private String id;

	private String lrn;
	private String studentId;

	private String firstName;
	private String gender;
	private String contactNo;

	private String lastName;
	private Date birthDate;
	private String birthPlace;
	private String citizenship;
	private String nationality;
	private String address1;
	private String address2;
	private String city;
	private String zipCode;
	private String country;

	private String fathersName;
	private String fathersOccupation;
	private String mothersName;
	private String mothersOccupation;
	private String parentCivilStatus;
	private String guardianName;

	private CodeGroupsDto level;
	private SchoolDto school;
}
