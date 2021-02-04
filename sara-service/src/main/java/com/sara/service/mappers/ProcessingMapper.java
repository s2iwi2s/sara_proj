package com.sara.service.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.sara.data.document.Processing;
import com.sara.service.dtos.ProcessingDto;

@Mapper(componentModel = "spring")
public interface ProcessingMapper {
	public ProcessingDto toDto(Processing entity);

	public Processing toEntity(ProcessingDto dto);

	public List<ProcessingDto> toDtos(List<Processing> list);
}
