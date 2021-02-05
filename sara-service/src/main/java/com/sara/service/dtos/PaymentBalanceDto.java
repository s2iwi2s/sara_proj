package com.sara.service.dtos;

import lombok.Data;

@Data
public class PaymentBalanceDto {
	private String id;
//	private StudentDto student;
//	private CodeGroupsDto period;
	private String code;
	private String name;
	private double amount;
	private double paid;
	private int order;

	public double getBalance() {
		return amount - paid;
	}
}
