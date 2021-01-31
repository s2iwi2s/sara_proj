package com.sara.service.dtos;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GradeLevelPayablesDto {
	private String id;
	private boolean active;
	private CodeGroupsDto level;
	private CodeGroupsDto period;
	private List<AccountPayablesSettingsDto> accountPayablesSettings;
}
