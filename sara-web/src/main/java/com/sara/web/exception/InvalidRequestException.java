package com.sara.web.exception;

public class InvalidRequestException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5220838497527420143L;

	public InvalidRequestException() {
		super("Invalid request");
	}

	public InvalidRequestException(String msg) {
		super(msg);
	}
}
