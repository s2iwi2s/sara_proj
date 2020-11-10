package com.sara.data.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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
	private String schoolYear;

	private String logo;
	private String address;
	
	@Transient
	public String getSchoolId() {
		return id;
	}

	@Override
	public String toString() {
		return String.format("School [id=%s, name=%s, schoolYear=%s, logo=%s, address=%s]", id, name, schoolYear, logo,
				address);
	}
}
