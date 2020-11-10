package com.sara.web.common;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.sara.data.document.User;
import com.sara.service.impl.UserServiceImpl;

public class UserUtil {

	public static User getAuthenticatedUser(UserServiceImpl userServiceImpl) {
		UsernamePasswordAuthenticationToken userAuth = (UsernamePasswordAuthenticationToken) SecurityContextHolder
				.getContext().getAuthentication();
		UserDetails userDetails = (UserDetails) userAuth.getPrincipal();
		String userName = userDetails.getUsername();
		return userServiceImpl.findByUserName(userName);
	}
}
