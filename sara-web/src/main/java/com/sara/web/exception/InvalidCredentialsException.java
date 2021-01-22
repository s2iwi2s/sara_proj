package com.sara.web.exception;

public class InvalidCredentialsException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = -700393998991756115L;

	public InvalidCredentialsException() {
		this("Invalid login credentials");
	}

	public InvalidCredentialsException(String msg) {
		super(msg);
	}
}
