package com.sara.web.security.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.sara.web.security.CustomUserDetails;

//@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

	static List<CustomUserDetails> inMemoryUserList = new ArrayList<>(); 

	static {
//		User user = new 
//		inMemoryUserList.add(new CustomUserDetails("1", "in28minutes",
//				"$2a$10$3zHzb.Npv1hfZbLEU5qsdOju/tk2je6W6PnNnY.c1ujWPcZh4PL6e", "ROLE_USER_2"));
//		inMemoryUserList.add(new CustomUserDetails("2", "test",
//				"$2a$10$fdxH3igDJy0ZKUdpKWtAsuri0GRed6sO14NTxchvC5PdyztTD4ztm", "ROLE_USER_2"));

	}


	public JwtInMemoryUserDetailsService() {
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<CustomUserDetails> findFirst = inMemoryUserList.stream()
				.filter(user -> user.getUsername().equals(username)).findFirst();
		if (!findFirst.isPresent()) {
			throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
		}
		return findFirst.get();
	}

}
