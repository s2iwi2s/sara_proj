package com.sara.service.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentInfo {
	private String code;
	private String name;
	private double payment;
	private int order;
	
	@Override
	public String toString() {
		return String.format("PaymentInfo [code=%s, name=%s, payment=%s, order=%s]", code, name, payment, order);
	}
}
