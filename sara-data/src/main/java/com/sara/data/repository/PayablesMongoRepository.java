package com.sara.data.repository;

import java.util.List;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.Payables;
import com.sara.data.document.School;
import com.sara.data.document.Student;

public interface PayablesMongoRepository
		extends CustomRepository<Payables, String> {

	List<Payables> findByStudent(Student student);
	List<Payables> findByStudentAndPeriod(Student student, CodeGroups period);

	List<Payables> findBySchoolAndPeriodAndStatusCode(School school, CodeGroups period, String status);
	void deleteByStudentAndStatusCode(Student student, String statusCode);
}
