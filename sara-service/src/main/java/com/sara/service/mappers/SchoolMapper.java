package com.sara.service.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.sara.data.document.School;
import com.sara.service.dtos.SchoolDto;

@Mapper(componentModel = "spring")
public interface SchoolMapper {
	public SchoolDto toDto(School entity);
	public School toEntity(SchoolDto dto);
	public List<SchoolDto> toDtos(List<School> list);
}
