package com.sara.web.controller.student;

import java.util.List;

import com.sara.data.document.School;
import com.sara.service.dtos.CodeGroupsDto;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentListService implements ListService {

	private List<CodeGroupsDto> studentLevelList = null;

	public StudentListService(School school, CodeGroupsServiceImpl codeGroupsServiceImpl) {
		studentLevelList = codeGroupsServiceImpl.findByCodeList("STUDENT_LEVEL", school);
	}
}
