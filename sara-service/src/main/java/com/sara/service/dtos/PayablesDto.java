package com.sara.service.dtos;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PayablesDto {
	private String id;

	private StudentSearchDto student;// Student.id
	private CodeGroupsDto period;

	private String invoiceNo;
	private Date invoiceDate;
	private String code;
	private String name;

	private double amount;
	private double payment;
	private int order;

	private String status;

	private AccountPayablesSettingsDto aps;

	private double balance;

	private double paid;

	public SchoolDto getSchool() {
		return student.getSchool();
	}

	@Override
	public String toString() {
		return String.format(
				"PayablesDto [id=%s, student=%s, invoiceNo=%s, invoiceDate=%s, code=%s, name=%s, period=%s, amount=%s, payment=%s, order=%s, status=%s, aps=%s, balance=%s, paid=%s]",
				id, student!= null? student.getFullName() : "NO Full Name", invoiceNo, invoiceDate, code, name, period != null?period.getDescription() : "No Period Description", amount, payment, order, status,
				aps.getId(), balance, paid);
	}

}
