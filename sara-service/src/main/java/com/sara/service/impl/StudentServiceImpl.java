package com.sara.service.impl;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
import com.sara.service.dtos.StudentDto;
import com.sara.service.dtos.StudentSearchDto;
import com.sara.service.mappers.StudentMapper;

@Service
public class StudentServiceImpl extends AbstractService<Student, StudentDto, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());

	private CodeGroupsServiceImpl codeGroupsServiceImpl;
	private StudentMapper studentMapper;

	public StudentServiceImpl(StudentMongoRepository repo, SequenceGeneratorService sequenceGeneratorService,
			CodeGroupsServiceImpl codeGroupsServiceImpl, StudentMapper studentMapper) {
		super(repo, sequenceGeneratorService);
		this.codeGroupsServiceImpl = codeGroupsServiceImpl;
		this.studentMapper = studentMapper;
	}

	@Override
	public BooleanExpression getFindAllBooleanExpression(User user) {
		return QStudent.student.school.eq(user.getSchool());
	}

	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder searchbb, User user) {
		searchbb.or(QStudent.student.firstName.containsIgnoreCase(searchValue));
		searchbb.or(QStudent.student.lastName.containsIgnoreCase(searchValue));
		searchbb.or(QStudent.student.lrn.containsIgnoreCase(searchValue));
//		searchbb.or(QStudent.student.level.description.containsIgnoreCase(searchValue));
	}

	public Page<StudentSearchDto> findAllBy(String by, String searchValue, Pageable pageable, School school) {
		if (!StringUtils.isBlank(by) && !StringUtils.isBlank(searchValue)) {
			// searchValue = searchValue.toLowerCase();
			BooleanBuilder param = new BooleanBuilder();

			param.and(QStudent.student.school.eq(school));

			// log.debug("findAllBy={}, searchValue={}", by, searchValue);
			BooleanBuilder studentbb = new BooleanBuilder();
			if ("LRN".equalsIgnoreCase(by)) {
				studentbb.or(QStudent.student.lrn.containsIgnoreCase(searchValue));
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
			Page<Student> page = repo.findAll(predicate, pageable);

			return new PageImpl<StudentSearchDto>(studentMapper.toSearchDtos(page.getContent()), page.getPageable(),
					page.getTotalElements());

		}
		Page<Student> page = findAll(pageable);
		return new PageImpl<StudentSearchDto>(studentMapper.toSearchDtos(page.getContent()), page.getPageable(),
				page.getTotalElements());
	}

	public Page<StudentDto> toDto(Page<Student> page) {
		return new PageImpl<StudentDto>(studentMapper.toDtos(page.getContent()), page.getPageable(),
				page.getTotalElements());
	}

	@Override
	public StudentDto toDto(Student entity) {
		return studentMapper.toDto(entity);
	}

	@Override
	public Student toEntity(StudentDto dto) {
		return studentMapper.toEntity(dto);
	}

	@Override
	public StudentDto saveDto(StudentDto dto, School school) {
		Student entity = toEntity(dto);
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
		return super.save(entity, school);
	}

	public StudentSearchDto searchByIdDto(String id) {
		return studentMapper.toSearchDto(findById(id));
	}
}
