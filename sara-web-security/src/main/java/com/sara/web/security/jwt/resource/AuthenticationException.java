package com.sara.web.security.jwt.resource;
public class AuthenticationException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 7345554797552337106L;

	public AuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }
}

