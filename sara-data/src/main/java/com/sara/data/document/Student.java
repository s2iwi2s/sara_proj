package com.sara.data.document;

import java.util.Date;
import java.util.List;

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

	@Id
	private String id;

	private String lrn;
	private String firstName;
	private String gender;

	private String lastName;
	private Date birthDate;
	private String birthPlace;
	
	@DBRef(lazy = true)
	private CodeGroups level;

	@DBRef(lazy = true)
	private School school;

	@Transient
	private List<Address> address;

	@Override
	public String toString() {
		return "Student [id=" + id + ", lrn=" + lrn + ", firstName=" + firstName + ", gender=" + gender + ", lastName="
				+ lastName + ", birthDate=" + birthDate + ", birthPlace=" + birthPlace + ", level=" + level
				+ ", school=" + school + "]";
	}
}
