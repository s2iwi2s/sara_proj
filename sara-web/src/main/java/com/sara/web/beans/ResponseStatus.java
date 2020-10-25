package com.sara.web.beans;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseStatus {
	public static enum STATUS_TYPE {
		INFO, ERROR, WARNING
	}

	public static enum STATUS {
		SUCCESS, FAIL
	}

	private STATUS_TYPE type = STATUS_TYPE.INFO;
	private STATUS code = STATUS.SUCCESS;
	private String message;

	public ResponseStatus(String message, STATUS_TYPE type, STATUS code) {
		super();
		this.type = type;
		this.code = code;
		this.message = message;
	}

	public ResponseStatus() {
		super();

		this.type = STATUS_TYPE.INFO;
		this.code = STATUS.SUCCESS;
	}

	public void setException(Exception e) {
		this.setMessage(e.getMessage());
		this.setCode(ResponseStatus.STATUS.FAIL);
		this.setType(ResponseStatus.STATUS_TYPE.ERROR);
	}

}
