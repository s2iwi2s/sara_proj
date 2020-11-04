package com.sara.web.beans;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Payables {
	private String code;
	private String name;
	private Double regular;
	private Double paid;
	private Double balance;
	private Map<String, Double> grant;
}
