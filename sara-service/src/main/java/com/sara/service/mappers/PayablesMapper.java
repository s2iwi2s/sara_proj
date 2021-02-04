package com.sara.service.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.sara.data.document.Payables;
import com.sara.data.document.PayablesOld;
import com.sara.data.document.PaymentBalance;
import com.sara.service.dtos.PayablesDto;

@Mapper(componentModel = "spring")
public interface PayablesMapper {
	public PayablesDto toDto(Payables entity);
	public Payables toEntity(PayablesDto dto);
	public List<Payables> toEntities(List<PayablesDto> list);
	public List<PayablesDto> toDtos(List<Payables> list);
	
	@Mapping(ignore = true, target = "id")
	public List<PayablesOld> toOld(List<Payables> list);
	

	public List<PaymentBalance> toBal(List<Payables> list);
}
