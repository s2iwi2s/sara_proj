package com.sara.web.security;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sara.data.document.Role;
import com.sara.data.document.User;
import com.sara.data.repository.UserMongoRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	Logger log = LoggerFactory.getLogger(this.getClass());

	private UserMongoRepository repository;

	@Autowired
	public CustomUserDetailsService(UserMongoRepository repository) {
		this.repository = repository;
	}

	@Transactional
	@Override
	public CustomUserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		User user = repository.findByUserName(userName);
		log.info("==========================================================");
		log.info("userName => {}", userName);
		if (user == null) {
			throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", userName));
		}

		Collection<Role> roles = user.getRoles();
		log.info("1. usersRoles => {}", roles);

		for (Role r : roles) {
			log.info("2. usersRoles => {}", r.getName());
		}
		log.info("==========================================================");
//		return new CustomUserDetails(user, "ROLE_USER_2");
		return new CustomUserDetails(user, roles);
	}

}
