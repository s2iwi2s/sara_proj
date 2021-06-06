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
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "account_payables_settings")
@TypeAlias("AccountPayablesSettings")
@ToString
public class AccountPayablesSettings {

	@Transient
	public static final String SEQUENCE_NAME = "account_payables_settings_sequence";
	
	public AccountPayablesSettings(Boolean dontDelete, String description, CodeGroups period, School school) {
		super();
		this.label = description;
		this.description = "SYSTEM.DONT.DELETE!";
		this.amount = 0.0;
		this.priority = 1000;
		this.applyToAll = true;
		this.active = true;
		this.period = period;
		this.school = school;
	}

	@Id
	private String id;
	
	private String label;
	private String description;
	private Double amount;
	private Short priority;

	private boolean text;
	private String textValue;
	private Short multilineRows;

	private boolean applyToAll;
	private boolean active = true;

	@DBRef
	private AccountPayablesSettings parent;

	@DBRef
	private CodeGroups period;
	
	@DBRef
	private CodeGroups paymentPeriod;

	@DBRef(lazy = true)
	private School school;

	@CreatedBy
	private User user;
	
	@CreatedDate
	private Date createdDate;

	@LastModifiedDate
	private Date lastModifiedDate;
}
