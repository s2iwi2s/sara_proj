package com.sara.service.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.sara.data.document.GradeLevelPayables;
import com.sara.service.dtos.GradeLevelPayablesDto;

@Mapper(componentModel = "spring")
public interface GradeLevelPayablesMapper {
	public GradeLevelPayablesDto toDto(GradeLevelPayables entity);
	public GradeLevelPayables toEntity(GradeLevelPayablesDto dto);
	public List<GradeLevelPayablesDto> toDtos(List<GradeLevelPayables> list);
}
