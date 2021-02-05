package com.sara.service.bean;

import java.util.ArrayList;
import java.util.List;

import com.sara.service.dtos.PaymentBalanceDto;

import lombok.Data;

@Data
public class PaymentBalanceResponse {
	private List<String> header;
	private List<PaymentBalanceDto> balances;

	private double totalBalance;

	public PaymentBalanceResponse(List<PaymentBalanceDto> balances) {
		this.balances = balances;

		header = new ArrayList<String>();
		totalBalance = 0;
		balances.forEach(pb -> {
			totalBalance += pb.getBalance();
			header.add(pb.getName());
		});
	}
}
