package com.sara.service.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.sara.data.document.AccountPayablesSettings;
import com.sara.service.dtos.AccountPayablesSettingsDto;

@Mapper(componentModel = "spring")
public interface AccountPayablesSettingsMapper {
	public AccountPayablesSettingsDto toDto(AccountPayablesSettings entity);

	public AccountPayablesSettings toEntity(AccountPayablesSettingsDto dto);

	public List<AccountPayablesSettingsDto> toDtos(List<AccountPayablesSettings> list);
}
