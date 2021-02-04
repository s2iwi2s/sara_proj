package com.sara.data.document;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "student")
@TypeAlias("Student")
public class Student {
	@Transient
	public static final String SEQUENCE_NAME = "student_sequence";
	public static final String SEQUENCE_STUDENT_ID = "student_id_sequence";

	@Id
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

	@DBRef
	private CodeGroups level;

	@DBRef(lazy = true)
	private School school;

	@Transient
	public String getFullName() {
		return lastName + ", " + firstName;
	}
	@Transient
	public int getLevelPriority() {
		return level.getPriority();
	}

	@Transient
	public String getSchoolYear() {
		if (school != null && school.getCurrentPeriod() != null && school.getCurrentPeriod().getValue() != null) {
			return school.getCurrentPeriod().getValue();
		}

		return "";
	}

	@Override
	public String toString() {
		return "Student [id=" + id + ", lrn=" + lrn + ", firstName=" + firstName + ", gender=" + gender + ", lastName="
				+ lastName + ", birthDate=" + birthDate + ", birthPlace=" + birthPlace + ", level=" + level
				+ ", school=" + school + "]";
	}
}
