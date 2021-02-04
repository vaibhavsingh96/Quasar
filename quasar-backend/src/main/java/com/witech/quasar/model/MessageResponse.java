package com.witech.quasar.model;

public class MessageResponse {
	private String message;
	
	public MessageResponse() {
	}

	public MessageResponse(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
