package com.sara.service.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.sara.data.document.PaymentBalance;
import com.sara.service.dtos.PaymentBalanceDto;

@Mapper(componentModel = "spring")
public interface PaymentBalanceMapper {
	public PaymentBalanceDto toDto(PaymentBalance entity);

	public PaymentBalance toEntity(PaymentBalanceDto dto);

	public List<PaymentBalanceDto> toDtos(List<PaymentBalance> list);
}
