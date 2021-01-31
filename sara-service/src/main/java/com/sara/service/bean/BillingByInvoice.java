package com.sara.service.bean;

import java.util.List;

import com.sara.service.dtos.AccountPayablesSettingsDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BillingByInvoice {
	List<AccountPayablesSettingsDto> accountPayablesSettings;
	private List<Invoice> list;
}
