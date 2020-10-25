package com.sara.data.document;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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
import lombok.ToString;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "authorized_url")
@TypeAlias("AuthorizedUrl")
public class AuthorizedUrl {
	@Transient
	private Log log = LogFactory.getLog(this.getClass().getCanonicalName());

	@Id
	private String id;

	private String name;
	private String url;

	private boolean permit;

	private String method;

	@DBRef(lazy = true)
	private Collection<Role> authorizedUrlRoles = new ArrayList<Role>();

	public AuthorizedUrl(String id, String url, boolean permit, Collection<Role> authorizedUrlRoles) {
		super();
		this.id = id;
		this.url = url;
		this.permit = permit;
		this.authorizedUrlRoles = authorizedUrlRoles;
	}

	public AuthorizedUrl(String id, String url, boolean permit, Role role) {
		this(id, url, permit, Arrays.asList(role));
	}

	public AuthorizedUrl(String id, String url, boolean permit) {
		this(id, url, permit, new ArrayList<Role>());
	}
}
