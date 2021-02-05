package com.sara.service.bean;

import java.util.ArrayList;
import java.util.List;

import com.sara.service.dtos.PaymentBalanceDto;

import lombok.Data;

@Data
public class PaymentBalanceResponse {
	private List<String> header;
	private List<PaymentBalanceDto> paymentBalances;
	
	public PaymentBalanceResponse(List<PaymentBalanceDto> paymentBalances) {
		this.paymentBalances = paymentBalances;
		
		header = new ArrayList<String>();
		paymentBalances.forEach(pb ->{
			header.add(pb.getName());
		});
	}
}
