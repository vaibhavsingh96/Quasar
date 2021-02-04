package com.witech.quasar.service;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.witech.quasar.model.User;

public class JwtUserDetails implements UserDetails {

	private static final long serialVersionUID = 1L;
	private String username;
	@JsonIgnore
	private String password;
	
	public JwtUserDetails(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	public static UserDetails build(User user) {
		return new JwtUserDetails(
					user.getUsername(),
					user.getPassword()
				);
	}

}
