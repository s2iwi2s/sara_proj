package com.sara.web.exception;

public class DuplicateException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8667320104429779623L;

	public DuplicateException() {
		this("Duplicate");
	}
	public DuplicateException(String msg) {
		super(msg);
	}
}
