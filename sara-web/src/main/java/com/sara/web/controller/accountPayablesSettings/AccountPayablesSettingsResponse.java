package com.sara.web.controller.accountPayablesSettings;

import java.util.ArrayList;

import com.sara.data.document.AccountPayablesSettings;
import com.sara.data.document.Address;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountPayablesSettingsResponse extends Response<AccountPayablesSettings> {
	private static final long serialVersionUID = -1164423995409192025L;
	Iterable<Address> list = new ArrayList<Address>();

	public AccountPayablesSettingsResponse(AccountPayablesSettingsListService addresssListService) {
		super(addresssListService);
	}
}
