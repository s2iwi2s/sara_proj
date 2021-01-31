package com.sara.web.controller.accountPayablesSettings;

import com.sara.service.dtos.AccountPayablesSettingsDto;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountPayablesSettingsResponse extends Response<AccountPayablesSettingsDto> {

	public AccountPayablesSettingsResponse(AccountPayablesSettingsListService accountPayablesSettingsListService) {
		super(accountPayablesSettingsListService);
	}
}
