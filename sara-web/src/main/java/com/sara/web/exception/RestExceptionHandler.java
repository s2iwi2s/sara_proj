package com.sara.web.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.sara.service.exception.DuplicateException;
import com.sara.service.exception.GradeLevelPayablesResponseException;
import com.sara.service.exception.InvalidCredentialsException;
import com.sara.service.exception.InvalidRequestException;
import com.sara.service.exception.NotFoundException;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(value = DuplicateException.class)
	public ResponseEntity<Object> handleDuplicateException(DuplicateException ex, WebRequest request) {
		return handleExceptionInternal(ex, ex.getMessage(), null, HttpStatus.CONFLICT, request);
	}

	@ExceptionHandler(value = { InvalidRequestException.class })
	public ResponseEntity<Object> handleInvalidRequestException(Exception ex, WebRequest request) {
		return handleExceptionInternal(ex, ex.getMessage(), null, HttpStatus.BAD_REQUEST, request);
	}

	@ExceptionHandler(value = { NotFoundException.class })
	public ResponseEntity<Object> handleNotFoundException(Exception ex, WebRequest request) {
		return handleExceptionInternal(ex, ex.getMessage(), null, HttpStatus.NOT_FOUND, request);
	}

	@ExceptionHandler(value = { InvalidCredentialsException.class })
	public ResponseEntity<Object> handleInvalidCredentialsException(Exception ex, WebRequest request) {
		return handleExceptionInternal(ex, ex.getMessage(), null, HttpStatus.UNAUTHORIZED, request);
	}

	@ExceptionHandler(value = { GradeLevelPayablesResponseException.class })
	public ResponseEntity<Object> handleGradeLevelPayablesResponseException(Exception ex,
			WebRequest request) {
		return handleExceptionInternal(ex, ex.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR, request);
	}


	@ExceptionHandler(value = IllegalArgumentException.class)
	public ResponseEntity<Object> handleIllegalArgumentException(Exception ex, WebRequest request) {
		return handleExceptionInternal(ex, ex.getMessage(), null, HttpStatus.BAD_REQUEST, request);
	}
}
