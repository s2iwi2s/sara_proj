package com.sara.web.security;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sara.data.document.EndUser;
import com.sara.data.document.Role;
import com.sara.data.repository.EndUserMongoRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	Logger log = LoggerFactory.getLogger(this.getClass());

	private EndUserMongoRepository repository;

	@Autowired
	public CustomUserDetailsService(EndUserMongoRepository repository) {
		this.repository = repository;
	}

	@Transactional
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		EndUser endUser = repository.findByUserName(userName);
		log.info("==========================================================");
		log.info("userName => {}", userName);
		if (endUser == null) {
			throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", userName));
		}

		Collection<Role> endUsersRoles = endUser.getEndUsersRoles();
		log.info("1. endUsersRoles => {}", endUsersRoles);

		for (Role r : endUsersRoles) {
			log.info("2. endUsersRoles => {}", r.getName());
		}
		log.info("==========================================================");
//		return new CustomUserDetails(endUser, "ROLE_USER_2");
		return new CustomUserDetails(endUser, endUsersRoles);
	}

}
