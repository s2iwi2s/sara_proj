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
@Document(collection = "address")
@TypeAlias("Address")
public class Address {

	@Transient
    public static final String SEQUENCE_NAME = "address_sequence";
	
	public Address(com.github.javafaker.Address temp) {
		this(temp.firstName() + " " + temp.lastName(), temp.streetAddress(), temp.secondaryAddress(), temp.city(),
				temp.state(), temp.country(), temp.zipCode(), "", "");
	}

	public Address(String name, String address1, String address2, String city, String state, String country,
			String zipCode, String billTo, String shipTo) {
		super();
		this.name = name;
		this.address1 = address1;
		this.address2 = address2;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zipCode = zipCode;
		this.billTo = billTo;
		this.shipTo = shipTo;
	}

	@Id
	private String id;

	@DBRef(lazy = true)
	private User user;
	
	@DBRef(lazy = true)
	private Student student;
	
	@DBRef(lazy = true)
	private School school;

	private String name;

	private String address1;

	private String address2;

	private String city;

	private String state;

	private String country;

	private String zipCode;

	private String billTo;

	private String shipTo;

	@Override
	public String toString() {
		return "Address [id=" + id + ", name=" + name + ", address1=" + address1 + ", address2=" + address2 + ", city="
				+ city + ", state=" + state + ", country=" + country + ", zipCode=" + zipCode + ", billTo=" + billTo
				+ ", shipTo=" + shipTo + "]";
	}

}
