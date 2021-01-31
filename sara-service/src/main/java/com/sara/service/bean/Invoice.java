package com.sara.service.bean;

import java.util.Date;
import java.util.Map;

import com.sara.service.dtos.PayablesDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
@Getter
@AllArgsConstructor
public class Invoice {
	private String invoiceNo;
	private Date invoiceDate;
	
	private Map<String, PayablesDto> payablesMap;
}
