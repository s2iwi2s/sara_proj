package com.sara.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.QCodeGroups;
import com.sara.data.document.QSchool;
import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.data.repository.SchoolMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;

@Service
public class SchoolServiceImpl extends AbstractService<School, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;
	
	SchoolMongoRepository repository;
	
	public SchoolServiceImpl(SchoolMongoRepository repo) {
		super(repo);
		repository = repo;
	}
	
	@Override
	public BooleanExpression getFindAllBooleanExpression(User user) {
		return null;
	}
	
	@Override
	public Predicate findAllPredicate(User user, BooleanBuilder searchbb) {
		return searchbb.getValue();
	}
	
	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder searchbb, User user) {
		searchbb.or(QSchool.school.name.containsIgnoreCase(searchValue));
		searchbb.or(QSchool.school.logo.containsIgnoreCase(searchValue));
		searchbb.or(QSchool.school.address.containsIgnoreCase(searchValue));
//		booleanBuilder.or(QSchool.school.address.address1.containsIgnoreCase(searchValue));
	}

	@Override
	public School getNewEntity() {
		return new School();
	}
	@Override
	public School save(School entity) {
		if(entity.getId() == null || entity.getId().trim().length() == 0) {
			String id = sequenceGeneratorService.nextSeq(School.SEQUENCE_NAME);
			entity.setId(id);
		}
		return super.save(entity);
	}
}
