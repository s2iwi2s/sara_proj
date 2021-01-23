package com.sara.service.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.GradeLevelPayables;
import com.sara.data.document.QGradeLevelPayables;
import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.data.repository.GradeLevelPayablesMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;
import com.sara.service.exception.GradeLevelPayablesResponseException;

@Service
public class GradeLevelPayablesServiceImpl extends AbstractService<GradeLevelPayables, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());
	private CodeGroupsServiceImpl codeGroupsServiceImpl;
	public GradeLevelPayablesServiceImpl(GradeLevelPayablesMongoRepository repo, SequenceGeneratorService sequenceGeneratorService, CodeGroupsServiceImpl codeGroupsServiceImpl) {
		super(repo, sequenceGeneratorService);
		this.codeGroupsServiceImpl = codeGroupsServiceImpl;
	}

	@Override
	public BooleanExpression getFindAllBooleanExpression(User user) {
		return QGradeLevelPayables.gradeLevelPayables.school.eq(user.getSchool());
	}

	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder searchbb, User user) {
//		searchbb.or(QGradeLevelPayables.gradeLevelPayables.level.id.eq(searchValue));
//		searchbb.or(QAccountPayablesSettings.accountPayablesSettings.paymentPeriod.description
//				.containsIgnoreCase(searchValue));
	}

	@Override
	public GradeLevelPayables getNewEntity() {
		return new GradeLevelPayables();
	}
	
	@Override
	public GradeLevelPayables save(GradeLevelPayables entity, School school) {
		entity.setSchool(school);
		entity = super.save(entity, school);
		if(!StringUtils.isBlank(entity.getLevel().getId())) {
			CodeGroups level = codeGroupsServiceImpl.findById(entity.getLevel().getId());
			entity.setLevel(level);
		}

		return entity;
	}
	
	public GradeLevelPayables findByLevel(CodeGroups level) throws GradeLevelPayablesResponseException{
		log.debug("level=" + level);
		List<GradeLevelPayables> list = ((GradeLevelPayablesMongoRepository)repo).findByLevelAndActive(level, true);
		log.debug("list=" + list);
		if(list.size() == 0) {
			throw new GradeLevelPayablesResponseException("Grade Level Payables has no active settings");
		}
		if(list.size() > 1) {
			throw new GradeLevelPayablesResponseException("Grade Level Payables has duplicate active values.");
		}
		
		return list.get(0);
		 
	}
}
