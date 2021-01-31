package com.sara.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.QSchool;
import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.data.repository.SchoolMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;
import com.sara.service.dtos.SchoolDto;
import com.sara.service.mappers.SchoolMapper;

@Service
public class SchoolServiceImpl extends AbstractService<School, SchoolDto, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());

	private CodeGroupsServiceImpl codeGroupsServiceImpl;
	private SchoolMapper schoolMapper;

	public SchoolServiceImpl(SchoolMongoRepository repo, SequenceGeneratorService sequenceGeneratorService,
			CodeGroupsServiceImpl codeGroupsServiceImpl, SchoolMapper schoolMapper) {
		super(repo, sequenceGeneratorService);
		this.codeGroupsServiceImpl = codeGroupsServiceImpl;
		this.schoolMapper = schoolMapper;
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
	public SchoolDto saveDto(SchoolDto dto, School school) {
		School entity = toEntity(dto);
		if (entity.getId() == null || entity.getId().trim().length() == 0) {
			String id = sequenceGeneratorService.nextSeq(School.SEQUENCE_NAME);
			entity.setId(id);
		}
		if (entity.getCurrentPeriod() != null && entity.getCurrentPeriod().getId() != null) {
			CodeGroups currentPeriod = codeGroupsServiceImpl.findById(entity.getCurrentPeriod().getId());
			entity.setCurrentPeriod(currentPeriod);
		}
		return super.save(entity, school);
	}

	@Override
	public SchoolDto toDto(School entity) {
		return schoolMapper.toDto(entity);
	}

	@Override
	public School toEntity(SchoolDto dto) {
		return schoolMapper.toEntity(dto);
	}

	@Override
	public Page<SchoolDto> toDto(Page<School> page) {
		return new PageImpl<SchoolDto>(schoolMapper.toDtos(page.getContent()), page.getPageable(),
				page.getTotalElements());
	}
}
