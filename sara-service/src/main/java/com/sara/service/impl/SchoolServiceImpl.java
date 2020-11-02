package com.sara.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.sara.data.document.QStudent;
import com.sara.data.document.Student;
import com.sara.data.repository.StudentMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;

@Service
public class SchoolServiceImpl extends AbstractService<Student, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;
	
	StudentMongoRepository repository;
	
	public SchoolServiceImpl(StudentMongoRepository repo) {
		super(repo);
		repository = repo;
	}

	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder booleanBuilder) {
		searchValue = "%" + searchValue + "%";
		booleanBuilder.or(QStudent.student.firstName.likeIgnoreCase(searchValue));
		booleanBuilder.or(QStudent.student.lastName.likeIgnoreCase(searchValue));
		booleanBuilder.or(QStudent.student.level.value.likeIgnoreCase(searchValue));
//		booleanBuilder.or(QStudent.student.address.address1.containsIgnoreCase(searchValue));
	}

	@Override
	public Student getNewEntity() {
		return new Student();
	}
	@Override
	public Student save(Student entity) {
		if(entity.getId() == null || entity.getId().trim().length() == 0) {
			String id = sequenceGeneratorService.nextSeq(Student.SEQUENCE_NAME);
			entity.setId(id);
		}
		return super.save(entity);
	}
}
