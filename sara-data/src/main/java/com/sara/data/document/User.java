package com.sara.data.document;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true, value = {"roles"})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "user")
@TypeAlias("User")
public class User {
	@Transient
    public static final String SEQUENCE_NAME = "user_sequence";
	@Id
	private String id;
	
	@Indexed(unique = true)
	private String userName;
	private String password;
	private String lastName;
	private String firstName;
	
	@DBRef
	private List<Role> roles = new ArrayList<Role>();


	@DBRef
	private School school;
}
