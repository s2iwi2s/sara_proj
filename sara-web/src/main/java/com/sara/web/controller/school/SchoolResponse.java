package com.sara.web.controller.school;

import com.sara.service.dtos.SchoolDto;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SchoolResponse extends Response<SchoolDto> {

	public SchoolResponse(SchoolListService schoolListService) {
		super(schoolListService); 
	}
}
