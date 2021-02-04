package com.sara.data.document;

import java.util.Date;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
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
@Document(collection = "payables_old")
@TypeAlias("PayablesOld")
public class PayablesOld {
	@Id
	private String id;

	private String invoiceNo;
	private Date invoiceDate;
	private String code;
	private String name;
	
	@DBRef(lazy = true)
	private CodeGroups period;
	
	private double amount;
	private double payment;
	private int order;
	
	private String statusCode;

	@DBRef(lazy = true)
	private AccountPayablesSettings aps;
	
	@DBRef(lazy = true)
	private Student student;
	@DBRef(lazy = true)
	private School school;

	@CreatedDate
	private Date createdDate;

	@LastModifiedDate
	private Date lastModifiedDate;

	@CreatedBy
	@DBRef
	private User user;

	@Transient
	private double balance;

	@Transient
	private double paid;

	@Override
	public String toString() {
		return String.format("PayablesOld [id=%s, code=%s, name=%s, amount=%s, payment=%s, balance=%s, paid=%s]",
				id, code, name, amount, payment, balance, paid);
	}

}
