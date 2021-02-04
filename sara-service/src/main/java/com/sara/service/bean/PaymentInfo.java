package com.sara.service.bean;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.School;
import com.sara.data.document.Student;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentInfo {
	private Student student;
	private String code;
	private String name;
	private double payment;
	private int order;
	private CodeGroups period;
	private School school;

	@Override
	public String toString() {
		return String.format("PaymentInfo [student.id=%s, code=%s, name=%s, payment=%s, order=%s]",
				student.getId(), code, name, payment, order);
	}
	
	
	
}
