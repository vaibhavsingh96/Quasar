package com.witech.quasar.model;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class UserRequest implements Serializable{

	private static final long serialVersionUID = 1L;
	  
	private String username;

	private String email;

	private String location;

	private String password;
	
	public UserRequest() {
	}

	public UserRequest(String username, String email, String location, String password) {
		super();
		this.username = username;
		this.email = email;
		this.location = location;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
}