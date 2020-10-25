package com.sara.data.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true, value = "password")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "end_user")
@TypeAlias("EndUser")
public class EndUser {
	@Id
	private String id;

	private String userName;

	private String password;

	private String firstName;

	private String lastName;

	@JsonIgnore
	@DBRef(lazy = true)
	private List<Address> address;

	@JsonIgnore
	@DBRef(lazy = true)
	private List<Role> endUsersRoles = new ArrayList<Role>();


}
