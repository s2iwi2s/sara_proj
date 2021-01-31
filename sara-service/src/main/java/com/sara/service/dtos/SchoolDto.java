package com.sara.service.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SchoolDto {
	private String id;
	private String name;
	private CodeGroupsDto currentPeriod;
	private String logo;
	private String address;
}
