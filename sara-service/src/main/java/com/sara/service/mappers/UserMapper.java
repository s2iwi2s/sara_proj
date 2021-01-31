package com.sara.service.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.sara.data.document.User;
import com.sara.service.dtos.UserDto;

@Mapper(componentModel = "spring")
public interface UserMapper {
	public UserDto toDto(User entity);
	public User toEntity(UserDto dto);
	public List<UserDto> toDtos(List<User> list);
	
}
