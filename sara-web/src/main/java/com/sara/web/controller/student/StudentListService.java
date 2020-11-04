package com.sara.web.controller.student;

import java.util.List;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.Student;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.StudentServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentListService implements ListService<Student> {

	private List<CodeGroups> studentLevelList = null;

	public StudentListService(StudentServiceImpl studentListService, CodeGroupsServiceImpl codeGroupsServiceImpl) {
		studentLevelList = codeGroupsServiceImpl.findByCodeList("STUDENT_LEVEL");
	}
}
