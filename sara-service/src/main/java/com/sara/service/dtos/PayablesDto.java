package com.sara.service.dtos;

import java.util.Date;

import org.springframework.data.annotation.Transient;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PayablesDto {
	private String id;

	private String invoiceNo;
	private Date invoiceDate;
	private String code;
	private String name;
	private CodeGroupsDto period;
	
	private double amount;
	private double payment;
	private int order;
	
	private String status;

	private AccountPayablesSettingsDto aps;
	
	private StudentDto student;// Student.id

	@Transient
	private double balance;

	@Transient
	private double paid;

	@Override
	public String toString() {
		return String.format("Payables [id=%s, code=%s, name=%s, amount=%s, payment=%s, balance=%s, paid=%s]",
				id, code, name, amount, payment, balance, paid);
	}

}
