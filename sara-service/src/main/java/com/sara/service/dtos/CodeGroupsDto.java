package com.sara.service.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CodeGroupsDto {
	private String id;
	private Integer priority;
	private String code;
	private String value;
	private String description;
	private String json;
}
