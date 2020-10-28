package com.sara.web.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sara.data.document.User;
import com.sara.data.document.Role;

public class CustomUserDetails implements UserDetails {

	private static final long serialVersionUID = 5155720064139820502L;

	private final String id;
	private final String username;
	private final String password;
	private final Collection<? extends GrantedAuthority> authorities;

	public CustomUserDetails(User endUser, String role) {
		this(endUser, Arrays.asList(new Role(role)));
	}

	public CustomUserDetails(User endUser, Collection<Role> roles) {
		this(endUser.getId(), endUser.getUserName(), endUser.getPassword(), roles);
	}

	public CustomUserDetails(String id, String username, String password, String role) {
		this(id, username, password, Arrays.asList(new Role(role)));
	}

	public CustomUserDetails(String id, String username, String password, Role role) {
		this(id, username, password, Arrays.asList(role));
	}

	public CustomUserDetails(String id, String username, String password, Collection<Role> roles) {
		this.id = id;
		this.username = username;
		this.password = password;

//		List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
//		roles.stream().map(r -> {
//			authorities.add(new SimpleGrantedAuthority(r.getName()));
//			return r;
//		});

		this.authorities = roles.stream().map(r -> {
			return new SimpleGrantedAuthority(r.getName());
		}).collect(Collectors.toList());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@JsonIgnore
	public String getId() {
		return id;
	}

	@JsonIgnore
	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
