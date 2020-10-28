package com.sara.web.controller.student;

import java.util.ArrayList;

import com.sara.data.document.Student;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentResponse extends Response<Student> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2763637172277887580L;
	Iterable<Student> list = new ArrayList<Student>();

	public StudentResponse(StudentListService StudentListService) {
		super(StudentListService);
	}
}
