package com.sara.service.bean;

import java.util.List;

import com.sara.data.document.Payables;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StudentPayables {
	private String invoiceNo;
	private List<Payables> payables;

	public StudentPayables(List<Payables> payables) {
		super();
		this.payables = payables;
	}

}
