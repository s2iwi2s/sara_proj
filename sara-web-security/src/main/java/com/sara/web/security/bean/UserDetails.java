package com.sara.web.security.bean;

import com.sara.data.document.School;
import com.sara.data.document.User;

import lombok.Getter;

@Getter
public class UserDetails {
	private String userName;
	private String userFullName;
	private String schoolId;
	private String schoolName;
	private String schoolAddress;
	private String schoolLogo;

	public UserDetails(User user) {
		super();
		this.userName = user.getUserName();
		this.userFullName = user.getFirstName() + " " + user.getLastName();

		School school = user.getSchool();
		if (user.getSchool() != null) {
			this.schoolId = school.getId();
			this.schoolName = school.getName();
			this.schoolAddress = school.getAddress();
			this.schoolLogo = school.getLogo();
		}
	}

}
