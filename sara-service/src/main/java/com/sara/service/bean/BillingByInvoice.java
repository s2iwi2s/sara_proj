package com.sara.service.bean;

import java.util.List;

import com.sara.data.document.GradeLevelPayables;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BillingByInvoice {
	private GradeLevelPayables gradeLevelPayables;
	private List<Invoice> list;
}
