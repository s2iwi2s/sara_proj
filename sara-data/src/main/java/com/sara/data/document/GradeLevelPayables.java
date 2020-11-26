package com.sara.data.document;

import java.util.List;

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
@Document(collection = "grade_level_payables_settings")
@TypeAlias("GradeLevelPayables")
public class GradeLevelPayables {

	@Transient
	public static final String SEQUENCE_NAME = "grade_level_payables_sequence";
	
	@Id
	private String id;

	@DBRef(lazy = true)
	private CodeGroups level;

	@DBRef(lazy = true)
	private List<AccountPayablesSettings> accountPayablesSettings;
	

	@DBRef(lazy = true)
	private School school;
}
