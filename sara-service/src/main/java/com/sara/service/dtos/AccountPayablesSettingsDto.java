package com.sara.service.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountPayablesSettingsDto {
	private String id;

	private String label;
	private String description;
	private Double amount;
	private Short priority;
	private boolean applyToAll;
	private boolean active = true;
	private CodeGroupsDto period;
	private CodeGroupsDto paymentPeriod;
}
