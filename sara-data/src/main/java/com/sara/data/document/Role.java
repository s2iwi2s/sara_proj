package com.sara.data.document;

import java.util.Collection;

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
@Document(collection = "role")
@TypeAlias("Role")
public class Role {
	@Transient
    public static final String SEQUENCE_NAME = "role_sequence";
	
	@Id
	private String id;

	private String name;
	
	@DBRef(lazy = true)
	private Collection<User> users;

	@DBRef(lazy = true)
	private Collection<AuthorizedUrl> authorizedUrls;

	public Role(String name) {
		super();
		this.name = name;
	}

}
