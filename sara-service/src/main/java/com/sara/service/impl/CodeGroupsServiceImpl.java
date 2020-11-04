package com.sara.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.QCodeGroups;
import com.sara.data.document.School;
import com.sara.data.document.Student;
import com.sara.data.repository.CodeGroupsMongoRepository;
import com.sara.service.AbstractService;

@Service
public class CodeGroupsServiceImpl extends AbstractService<CodeGroups, String> {
	
	private static final Logger log = LoggerFactory.getLogger(CodeGroupsServiceImpl.class);

	private CodeGroupsMongoRepository repository;
	private SchoolServiceImpl schoolServiceImpl;

	@Autowired
	public CodeGroupsServiceImpl(CodeGroupsMongoRepository repo, SchoolServiceImpl schoolServiceImpl) {
		super(repo);
		this.repository = repo;
		this.schoolServiceImpl = schoolServiceImpl;
	}

	public Page<CodeGroups> findAll(Pageable pageable) {
		return repository.findAll(pageable);
	}

	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder booleanBuilder) {
		booleanBuilder.or(QCodeGroups.codeGroups.code.containsIgnoreCase(searchValue));
		booleanBuilder.or(QCodeGroups.codeGroups.value.containsIgnoreCase(searchValue));
		booleanBuilder.or(QCodeGroups.codeGroups.description.containsIgnoreCase(searchValue));
	}

	@Override
	public CodeGroups getNewEntity() {
		return new CodeGroups();
	}
	
	public List<CodeGroups> findByCodeList(String code) {
		return repository.findByCodeOrderByPriority(code);
	}
	
	public CodeGroups findByCode(String code) {
		return repository.findByCode(code);
	}
	
	@Override
	public CodeGroups save(CodeGroups entity) {
		log.info("save CodeGroups entity==>{}", entity); 
		log.info("save CodeGroups schoolId==>{}", entity.getSchool()); 
		if(entity.getSchool() != null) {
			School school = schoolServiceImpl.findById(entity.getSchool().getId());
			entity.setSchool(school);
		}
		return super.save(entity);
	}
}
