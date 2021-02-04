package com.sara.data.document;

import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "payment_balance")
@TypeAlias("PaymentBalance")
public class PaymentBalance {
	@DBRef
	private Student student;
	@DBRef
	private CodeGroups period;
	private String code;
	private String name;
	private double amount;
	private double paid;
	private double balance;
	private int order;
	@DBRef
	private School school;

	@Override
	public String toString() {
		return String.format(
				"PaymentBalance [student=%s, code=%s, name=%s, amount=%s, paid=%s, balance=%s, order=%s, period=%s, school=%s]",
				student.getFullName(), code, name, amount, paid, balance, order, period.getDescription(),
				school.getName());
	}
}
