package com.sara.service.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.sara.data.document.Student;
import com.sara.service.dtos.StudentDto;
import com.sara.service.dtos.StudentSearchDto;

@Mapper(componentModel = "spring")
public interface StudentMapper {
	public StudentDto toDto(Student entity);
	public StudentSearchDto toSearchDto(Student entity);
	public Student toEntity(StudentDto dto);
	public Student toEntity(StudentSearchDto dto);
	
	public List<StudentDto> toDtos(List<Student> list);
	public List<StudentSearchDto> toSearchDtos(List<Student> list);
}
