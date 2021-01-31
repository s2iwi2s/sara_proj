package com.sara.web.controller.gradeLevelPayables;

import com.sara.service.dtos.GradeLevelPayablesDto;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GradeLevelPayablesResponse extends Response<GradeLevelPayablesDto> {
	public GradeLevelPayablesResponse(GradeLevelPayablesListService gradeLevelPayablesListService) {
		super(gradeLevelPayablesListService);
	}
}
