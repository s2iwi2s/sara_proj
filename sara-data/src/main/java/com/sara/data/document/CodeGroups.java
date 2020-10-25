package com.sara.data.document;


import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.github.javafaker.Faker;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "code_groups")
@TypeAlias("CodeGroups")
public class CodeGroups {
	
	public CodeGroups(Faker faker) {
		super();
		this.code = faker.lorem().word();
		this.value = faker.lorem().word();
		this.description = faker.lorem().sentence();
		this.bool = faker.lorem().word();
		this.num = faker.lorem().word();
	}

	@Id
	private String id;

	private String code;

	private String value;

	private String description;

	private String bool;

	private String num;

}
