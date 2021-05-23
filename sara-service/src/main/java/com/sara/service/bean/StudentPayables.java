package com.sara.service.bean;

import java.util.Date;
import java.util.List;

import com.sara.service.dtos.PayablesDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class StudentPayables {
	private String invoiceNo;
	private Date invoiceDate;
	private List<PayablesDto> payables;
	private List<PayablesDto> payablesByInvoiceNo;

	public StudentPayables(List<PayablesDto> payables, List<PayablesDto> payablesByInvoiceNo, String invoiceNo,
			Date invoiceDate) {
		this.payables = payables;
		this.payablesByInvoiceNo = payablesByInvoiceNo;
		this.invoiceNo = invoiceNo;
		this.invoiceDate = invoiceDate;
	}
	
}
