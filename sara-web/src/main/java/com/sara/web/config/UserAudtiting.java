package com.sara.web.config;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.sara.data.document.User;
import com.sara.service.impl.UserServiceImpl;

@Component
public class UserAudtiting implements AuditorAware<User> {

	private static final Logger log = LoggerFactory.getLogger(UserAudtiting.class);

	@Autowired
	private UserServiceImpl userServiceImpl;

	@Override
	public Optional<User> getCurrentAuditor() {
		UsernamePasswordAuthenticationToken userAuth = (UsernamePasswordAuthenticationToken) SecurityContextHolder
				.getContext().getAuthentication();
		UserDetails userDetails = (UserDetails) userAuth.getPrincipal();
		String userName = userDetails.getUsername();
		log.debug("userName=>{}",userName);
		User user = userServiceImpl.findByUserName(userName);
		return Optional.of(user);
	}

}
