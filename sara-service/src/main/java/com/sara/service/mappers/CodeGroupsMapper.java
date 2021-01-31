package com.sara.service.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.sara.data.document.CodeGroups;
import com.sara.service.dtos.CodeGroupsDto;

@Mapper(componentModel = "spring")
public interface CodeGroupsMapper {
	public CodeGroupsDto toDto(CodeGroups entity);

	public CodeGroups toEntity(CodeGroupsDto dto);

	public List<CodeGroupsDto> toDtos(List<CodeGroups> list);
}
