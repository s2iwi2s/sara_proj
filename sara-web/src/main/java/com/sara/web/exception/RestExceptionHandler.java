package com.sara.web.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.sara.service.exception.GradeLevelPayablesResponseException;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

//	@ExceptionHandler(value = DuplicateQuizException.class)
//	public ResponseEntity<Object> handleDuplicateQuizException(DuplicateQuizException ex, WebRequest request) {
//		return handleExceptionInternal(ex, ex.getMessage(), null, HttpStatus.CONFLICT, request);
//	}

	@ExceptionHandler(value = { GradeLevelPayablesResponseException.class })
	public ResponseEntity<Object> handleInvalidRequestException(Exception ex,
			WebRequest request) {
		return handleExceptionInternal(ex, ex.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR, request);
	}
	
}
