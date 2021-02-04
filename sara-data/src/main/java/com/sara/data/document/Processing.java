package com.sara.data.document;

import java.util.Date;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
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
@Document(collection = "processing")
@TypeAlias("Processing")
public class Processing {

	@Transient
    public static final String SEQUENCE_NAME = "processing_sequence";
	
	public Processing(String type, String status, String jsonParams, School school) {
		super();
		this.type = type;
		this.status = status;
		this.school = school;
		this.jsonParams = jsonParams;
	}

	@Id
	private String id;
	
	private String type;
	private String status;

	private String jsonParams;
	
	private String statusMessage;
	
	@CreatedDate
	private Date createdDate;

	@CreatedBy
	@DBRef
	private User user;
	
	@DBRef
	private School school;

	@Override
	public String toString() {
		return String.format("Processing [id=%s, type=%s, status=%s, createdDate=%s, user=%s, school=%s]", id, type,
				status, createdDate, user, school);
	}
	
}
