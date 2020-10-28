package com.sara.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.sara.data.document.Address;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.QStudent;
import com.sara.data.document.Student;
import com.sara.data.repository.StudentMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;

@Service
public class StudentServiceImpl extends AbstractService<Student, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private AddressServiceImpl addressServiceImpl;
	
	@Autowired
	private CodeGroupsServiceImpl codeGroupsServiceImpl;
	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;
	
	StudentMongoRepository repository;
	
	public StudentServiceImpl(StudentMongoRepository repo) {
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
		String id = entity.getId();
		List<Address> addressList = entity.getAddress();
		log.info("entity={}", entity);
		log.info("addressList={}", addressList);
		if(id == null || id.trim().length() == 0) {
			id = sequenceGeneratorService.nextSeq(Student.SEQUENCE_NAME);
			entity.setId(id);
			if(addressList != null && addressList.size() != 0) {
				for(Address a : addressList) {
					String aid = sequenceGeneratorService.nextSeq(Address.SEQUENCE_NAME);
					a.setId(aid);
					a.setStudent(entity);
				}
			}
		}
//		CodeGroups level = entity.getLevel();
//		level = codeGroupsServiceImpl.findById(level.getId());
//		entity.setLevel(level);

		entity = super.save(entity);
		//addressServiceImpl.saveAll(addressList);
		log.info("saved entity={}", entity);
		log.info("saved entity id={}", entity.getId());
		return entity;
	}
}
