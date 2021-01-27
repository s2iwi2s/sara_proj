package com.sara.service.bean;

import java.util.List;

import com.sara.data.document.AccountPayablesSettings;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BillingByInvoice {
	List<AccountPayablesSettings> accountPayablesSettings;
	private List<Invoice> list;
}
