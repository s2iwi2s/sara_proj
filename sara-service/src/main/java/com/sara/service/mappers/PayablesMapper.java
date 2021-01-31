package com.sara.service.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.sara.data.document.Payables;
import com.sara.service.dtos.PayablesDto;

@Mapper(componentModel = "spring")
public interface PayablesMapper {
	public PayablesDto toDto(Payables entity);
	public Payables toEntity(PayablesDto dto);
	public List<Payables> toEntities(List<PayablesDto> list);
	public List<PayablesDto> toDtos(List<Payables> list);
}
