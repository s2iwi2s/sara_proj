package com.sara.web.controller.student;

import java.util.List;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.School;
import com.sara.data.document.Student;
import com.sara.data.document.User;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.StudentServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.common.ListService;
import com.sara.web.common.UserUtil;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentListService implements ListService<Student> {
	
	private List<CodeGroups> studentLevelList = null;
	public StudentListService(School school, StudentServiceImpl studentListService, CodeGroupsServiceImpl codeGroupsServiceImpl) {
		studentLevelList = codeGroupsServiceImpl.findByCodeList("STUDENT_LEVEL", school);
	}
}
