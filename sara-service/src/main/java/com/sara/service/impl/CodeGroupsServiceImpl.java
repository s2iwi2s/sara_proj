package com.sara.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.QCodeGroups;
import com.sara.data.repository.CodeGroupsMongoRepository;
import com.sara.service.AbstractService;

@Service
public class CodeGroupsServiceImpl extends AbstractService<CodeGroups, String> {
	private CodeGroupsMongoRepository repository;

	@Autowired
	public CodeGroupsServiceImpl(CodeGroupsMongoRepository repo) {
		super(repo);
		this.repository = repo;
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

	public CodeGroups findById(String id) {
		if (id == null || "-1".equals(id)) {
			return new CodeGroups();
		}
		return repository.findById(id).get();
	}
}
