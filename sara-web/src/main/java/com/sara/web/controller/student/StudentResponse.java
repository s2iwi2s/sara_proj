package com.sara.web.controller.student;

import java.util.ArrayList;

import com.sara.data.document.Student;
import com.sara.service.dtos.StudentDto;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentResponse extends Response<StudentDto> {

	Iterable<Student> list = new ArrayList<Student>();

	public StudentResponse(StudentListService StudentListService) {
		super(StudentListService);
	}
}
