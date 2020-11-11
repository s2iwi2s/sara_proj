package com.sara.service.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.QCodeGroups;
import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.data.repository.CodeGroupsMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;

@Service
public class CodeGroupsServiceImpl extends AbstractService<CodeGroups, String> {
	
	private static final Logger log = LoggerFactory.getLogger(CodeGroupsServiceImpl.class);

	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;
	
	private SchoolServiceImpl schoolServiceImpl;

	@Autowired
	public CodeGroupsServiceImpl(CodeGroupsMongoRepository repo, SchoolServiceImpl schoolServiceImpl) {
		super(repo);
		this.schoolServiceImpl = schoolServiceImpl;
	}

	public Page<CodeGroups> findAll(Pageable pageable) {
		return repo.findAll(pageable);
	}
	
	@Override
	public BooleanExpression getFindAllBooleanExpression(User user) {
		return QCodeGroups.codeGroups.school.eq(user.getSchool());
	}

	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder searchbb, User user) {
		searchbb.or(QCodeGroups.codeGroups.code.containsIgnoreCase(searchValue));
		searchbb.or(QCodeGroups.codeGroups.value.containsIgnoreCase(searchValue));
		searchbb.or(QCodeGroups.codeGroups.description.containsIgnoreCase(searchValue));
	}

	@Override
	public CodeGroups getNewEntity() {
		return new CodeGroups();
	}
	
	public List<CodeGroups> findByCodeList(String code, School school) {
		return ((CodeGroupsMongoRepository)repo).findByCodeAndSchoolOrderByPriority(code, school);
	}
	
	public CodeGroups findByCode(String code, School school) {
		return ((CodeGroupsMongoRepository)repo).findByCodeAndSchool(code, school);
	}
	
	@Override
	public CodeGroups save(CodeGroups entity) {
		log.info("save CodeGroups entity==>{}", entity); 
		log.info("save CodeGroups schoolId==>{}", entity.getSchool()); 
		if(StringUtils.isBlank(entity.getId())) {
			String id = sequenceGeneratorService.nextSeq(CodeGroups.SEQUENCE_NAME);
			entity.setId(id);
		}
		
		if(entity.getSchool() != null) {
			School school = schoolServiceImpl.findById(entity.getSchool().getId());
			entity.setSchool(school);
		}
		return super.save(entity);
	}
}
