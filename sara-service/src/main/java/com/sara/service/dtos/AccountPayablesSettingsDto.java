package com.sara.service.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountPayablesSettingsDto implements Comparable<AccountPayablesSettingsDto>{
	private String id;

	private String label;
	private String description;
	private Double amount;
	private Short priority;
	private boolean applyToAll;
	private boolean active = true;
	private CodeGroupsDto period;
	private CodeGroupsDto paymentPeriod;

	private boolean text;
	private String textValue;
	private Short multilineRows;
	@Override
	public int compareTo(AccountPayablesSettingsDto o) {
		return this.priority - o.priority;
	}
}
