package com.sara.service.impl;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.QStudent;
import com.sara.data.document.School;
import com.sara.data.document.Student;
import com.sara.data.document.User;
import com.sara.data.repository.StudentMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;

@Service
public class StudentServiceImpl extends AbstractService<Student, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());

	private CodeGroupsServiceImpl codeGroupsServiceImpl;

	public StudentServiceImpl(StudentMongoRepository repo, SequenceGeneratorService sequenceGeneratorService,
			CodeGroupsServiceImpl codeGroupsServiceImpl) {
		super(repo, sequenceGeneratorService);
		this.codeGroupsServiceImpl = codeGroupsServiceImpl;
	}

	@Override
	public BooleanExpression getFindAllBooleanExpression(User user) {
		return QStudent.student.school.eq(user.getSchool());
	}

	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder searchbb, User user) {
		searchbb.or(QStudent.student.firstName.containsIgnoreCase(searchValue));
		searchbb.or(QStudent.student.lastName.containsIgnoreCase(searchValue));
		searchbb.or(QStudent.student.studentId.containsIgnoreCase(searchValue));
//		searchbb.or(QStudent.student.level.description.containsIgnoreCase(searchValue));
	}

	@Override
	public Student getNewEntity() {
		return new Student();
	}

	@Override
	public Student save(Student entity, School school) {
		log.debug("sequenceGeneratorService={}", sequenceGeneratorService);
		if (StringUtils.isBlank(entity.getId())) {
			String id = sequenceGeneratorService.nextSeq(Student.SEQUENCE_NAME);
			entity.setId(id);
		}
		entity.setSchool(school);

		if (!StringUtils.isBlank(entity.getLevel().getId())) {
			CodeGroups level = codeGroupsServiceImpl.findById(entity.getLevel().getId());
			entity.setLevel(level);
		}
		if (StringUtils.isBlank(entity.getStudentId())) {
			String studentId = sequenceGeneratorService.nextSeq(entity.getSchoolYear().replaceAll("-", ""),
					Student.SEQUENCE_STUDENT_ID);
			entity.setStudentId(studentId);
		}
		entity = super.save(entity, school);
		return entity;
	}

	public Page<Student> findAllBy(String by, String searchValue, Pageable pageable, School school) {
		if (!StringUtils.isBlank(by) && !StringUtils.isBlank(searchValue)) {
			// searchValue = searchValue.toLowerCase();
			BooleanBuilder param = new BooleanBuilder();

			param.and(QStudent.student.school.eq(school));

			// log.debug("findAllBy={}, searchValue={}", by, searchValue);
			BooleanBuilder studentbb = new BooleanBuilder();
			if ("STUDENT_ID".equalsIgnoreCase(by)) {
				studentbb.or(QStudent.student.studentId.containsIgnoreCase(searchValue));
			} else if ("STUDENT_NAME".equalsIgnoreCase(by)) {
				String[] name = searchValue.split(" ");
				// log.debug("findAllBy={}, {}", by, searchValue);
				for (String value : name) {
					// log.debug(value);
					if (!StringUtils.isBlank(value)) {
						studentbb.or(QStudent.student.firstName.containsIgnoreCase(value));
						studentbb.or(QStudent.student.lastName.containsIgnoreCase(value));
//						booleanBuilder.or(QStudent.student.firstName.like( value ));
//						booleanBuilder.or(QStudent.student.lastName.like( value ));
					}
				}
			}
			param.and(studentbb);
			log.debug("findAllBy=>" + param.toString());
			Predicate predicate = param.getValue();
			return repo.findAll(predicate, pageable);
		}

		return findAll(pageable);
	}
}
