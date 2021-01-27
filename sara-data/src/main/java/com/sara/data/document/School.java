package com.sara.data.document;

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
@Document(collection = "school")
@TypeAlias("School")
public class School {
	@Transient
    public static final String SEQUENCE_NAME = "school_sequence";
	
	
	@Id
	private String id;

	private String name;

	@DBRef
	private CodeGroups currentPeriod;

	private String logo;
	private String address;

	@Transient
	public String getSchoolId() {
		return id;
	}
	
	@Transient
	public String getCurrentPeriodDesc() {
		return currentPeriod != null? currentPeriod.getDescription() : "";
	}

	@Override
	public String toString() {
		return String.format("School [id=%s, name=%s, currentPeriod=%s, logo=%s, address=%s]", id, name, getCurrentPeriodDesc(), logo,
				address);
	}

	public School(String id, String name, String logo, String address) {
		super();
		this.id = id;
		this.name = name;
		this.logo = logo;
		this.address = address;
	}
}
