package com.sara.service.bean;

import java.util.Date;
import java.util.List;

import com.sara.data.document.Payables;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StudentPayables {
	private String invoiceNo;
	private Date invoiceDate;
	private List<Payables> payables;
	private List<Payables> payablesByInvoiceNo;

	public StudentPayables(List<Payables> payables, List<Payables> payablesByInvoiceNo, String invoiceNo,
			Date invoiceDate) {
		this.payables = payables;
		this.payablesByInvoiceNo = payablesByInvoiceNo;
		this.invoiceNo = invoiceNo;
		this.invoiceDate = invoiceDate;
	}
}
