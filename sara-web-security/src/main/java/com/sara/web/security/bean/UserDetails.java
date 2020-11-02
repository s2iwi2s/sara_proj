package com.sara.web.security.bean;

import com.sara.data.document.School;
import com.sara.data.document.User;

import lombok.Getter;

@Getter
public class UserDetails {
	private String userName;
	private String userFullName;
	private String schoolName;
	private String schoolLogo;
	
	public UserDetails(User user) {
		super();
		this.userName = user.getUserName();
		this.userFullName = user.getFirstName() + " " + user.getLastName();
		
		School school = user.getSchool();
		if(user.getSchool() != null) {
			this.schoolName = school.getName();
			this.schoolLogo = school.getLogo();
		}
	}

}
