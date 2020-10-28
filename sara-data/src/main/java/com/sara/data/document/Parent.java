package com.sara.data.document;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Transient;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Document(collection = "parent")
@TypeAlias("Parent")
public class Parent {
	@Transient
    public static final String SEQUENCE_NAME = "parent_sequence";
	
	private String lastName;
	private String firstName;
	private String middleName;
	private String contactNumber;
	private Date birthDate;
	private String birthPlace;
	
	private Student student;
	
	@JsonIgnore
	@DBRef(lazy = true)
	private List<Address> address;
}
