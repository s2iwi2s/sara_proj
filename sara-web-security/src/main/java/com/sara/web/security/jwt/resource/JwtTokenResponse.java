package com.sara.web.security.jwt.resource;

import java.io.Serializable;

import com.sara.web.security.bean.UserDetails;

import lombok.Getter;

@Getter
public class JwtTokenResponse implements Serializable {

	private static final long serialVersionUID = 8317676219297719109L;

	private final UserDetails userDetails;
	private final String token;

	public JwtTokenResponse(String token, UserDetails userDetails) {
		this.token = token;
		this.userDetails = userDetails;
	}
}
