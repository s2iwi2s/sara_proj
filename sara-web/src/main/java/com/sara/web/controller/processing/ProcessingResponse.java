package com.sara.web.controller.processing;

import com.sara.service.dtos.ProcessingDto;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProcessingResponse extends Response<ProcessingDto> {

	public ProcessingResponse(ProcessingListService processingListService) {
		super(processingListService); 
	}
}
