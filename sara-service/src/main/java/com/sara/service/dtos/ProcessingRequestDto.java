package com.sara.service.dtos;

import java.util.HashMap;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProcessingRequestDto {
	private String type;
	private HashMap<String, String> params;
	private String status;

	@Override
	public String toString() {
		return String.format("ProcessingRequestDto [type=%s, params=%s, status=%s]", type, params, status);
	}

}
