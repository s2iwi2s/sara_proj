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
@Document(collection = "payables_balance")
@TypeAlias("PayablesBalance")
public class PayablesBalance {
	@Transient
	public static final String SEQUENCE_NAME = "payables_balance_sequence";
	
	@Id
	private String id;
	
	@DBRef(lazy = true)
	private CodeGroups period;
	
	private double amount;

	@DBRef(lazy = true)
	private AccountPayablesSettings aps;
	
	@DBRef(lazy = true)
	private Student student;

	@CreatedDate
	private Date createdDate;

	@LastModifiedDate
	private Date lastModifiedDate;

	@CreatedBy
	@DBRef
	private User user;
}
