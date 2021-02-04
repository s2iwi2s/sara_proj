package com.sara.service.dtos;

import java.util.Date;

import org.springframework.data.annotation.Transient;

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

	@Transient
	private double balance;

	@Transient
	private double paid;

	@Transient
	public SchoolDto getSchool() {
		return student.getSchool();
	}

	@Override
	public String toString() {
		return String.format(
				"PayablesDto [id=%s, student=%s, invoiceNo=%s, invoiceDate=%s, code=%s, name=%s, period=%s, amount=%s, payment=%s, order=%s, status=%s, aps=%s, balance=%s, paid=%s]",
				id, student.getFullName(), invoiceNo, invoiceDate, code, name, period.getDescription(), amount, payment, order, status,
				aps.getId(), balance, paid);
	}

}
