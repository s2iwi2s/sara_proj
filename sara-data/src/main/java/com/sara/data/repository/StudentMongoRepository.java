package com.sara.data.repository;

import java.util.List;

import com.sara.data.document.School;
import com.sara.data.document.Student;

public interface StudentMongoRepository extends CustomRepository<Student, String> {
	List<Student> findBySchool(School school);
}
