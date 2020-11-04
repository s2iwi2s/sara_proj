package com.sara.service.impl;

import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.sara.data.document.QStudent;
import com.sara.data.document.School;
import com.sara.data.document.Student;
import com.sara.data.repository.SchoolMongoRepository;
import com.sara.data.repository.StudentMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;

@Service
public class StudentServiceImpl extends AbstractService<Student, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;

	StudentMongoRepository repository;

	@Autowired
	SchoolMongoRepository schoolMongoRepository;

	public StudentServiceImpl(StudentMongoRepository repo) {
		super(repo);
		repository = repo;
	}

	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder booleanBuilder) {
		searchValue = "%" + searchValue + "%";
		booleanBuilder.or(QStudent.student.firstName.like(searchValue));
		booleanBuilder.or(QStudent.student.lastName.like(searchValue));
		booleanBuilder.or(QStudent.student.level.value.like(searchValue));
//		booleanBuilder.or(QStudent.student.address.address1.containsIgnoreCase(searchValue));
	}

	@Override
	public Student getNewEntity() {
		return new Student();
	}

	@Override
	public Student save(Student entity) {
		if (StringUtils.isBlank(entity.getId())) {
			String id = sequenceGeneratorService.nextSeq(Student.SEQUENCE_NAME);
			entity.setId(id);
		}
		if (entity.getSchool() != null && StringUtils.isBlank(entity.getSchool().getName())) {
			String schoolId = entity.getSchool().getId();
			Optional<School> schoolOpt = schoolMongoRepository.findById(schoolId);
			if (schoolOpt.isPresent()) {
				entity.setSchool(schoolOpt.get());
			}
		}
		
		if (StringUtils.isBlank(entity.getStudentId())) {
			School school = entity.getSchool();
			if(school != null) {
				String studentId = sequenceGeneratorService.nextSeq(school.getShoolYear(),Student.SEQUENCE_STUDENT_ID);
				entity.setStudentId(studentId);
			}
			
		}

		return super.save(entity);
	}

	public Page<Student> findAllBy(String by, String searchValue, Pageable pageable) {
		if (!StringUtils.isBlank(by) && !StringUtils.isBlank(searchValue)) {
			//searchValue = searchValue.toLowerCase();

			log.debug("findAllBy={}, searchValue={}",by, searchValue);
			BooleanBuilder booleanBuilder = new BooleanBuilder();
			if ("STUDENT_ID".equalsIgnoreCase(by)) {
				booleanBuilder.or(QStudent.student.studentId.like("%" + searchValue + "%"));
			} else if ("STUDENT_NAME".equalsIgnoreCase(by)) {
				String[] name = searchValue.split(" ");
				log.debug("findAllBy={}, {}",by, searchValue);
				for(String value : name) {
					log.debug(value);
					if(!StringUtils.isBlank(value)) {
						booleanBuilder.or(QStudent.student.firstName.like("%" + value + "%"));
						booleanBuilder.or(QStudent.student.lastName.like("%" + value + "%"));
//						booleanBuilder.or(QStudent.student.firstName.like("%" + value + "%"));
//						booleanBuilder.or(QStudent.student.lastName.like("%" + value + "%"));
					}
				}
			}
			Predicate predicate = booleanBuilder.getValue();
			return repository.findAll(predicate, pageable);
		}

		return findAll(pageable);
	}
}
