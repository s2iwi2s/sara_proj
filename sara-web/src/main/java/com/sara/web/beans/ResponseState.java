package com.sara.web.beans;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseState implements Serializable{
	private static final long serialVersionUID = -7624950953529707082L;
	private ResponseStatus responseStatus;
	public ResponseState() {
		
	}
	public ResponseState(ResponseStatus responseStatus) {
		super();
		this.responseStatus = responseStatus;
	}
}
