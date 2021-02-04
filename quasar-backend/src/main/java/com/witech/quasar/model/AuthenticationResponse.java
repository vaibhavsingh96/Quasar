package com.witech.quasar.model;

import java.io.Serializable;

public class AuthenticationResponse implements Serializable {

	private static final long serialVersionUID = 1L;
	private final String jwt;
	private final String username;
	
	public AuthenticationResponse(String jwt, String username) {
		this.jwt = jwt;
		this.username = username;
	}
	
	public String getJwt() {
		return jwt;
	}

	public String getUsername() {
		return username;
	}
	
}
