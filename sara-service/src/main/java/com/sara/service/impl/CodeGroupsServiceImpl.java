package com.sara.service.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
import com.sara.service.dtos.CodeGroupsDto;
import com.sara.service.mappers.CodeGroupsMapper;

@Service
public class CodeGroupsServiceImpl extends AbstractService<CodeGroups, CodeGroupsDto, String> {

	private static final Logger log = LoggerFactory.getLogger(CodeGroupsServiceImpl.class);
	private CodeGroupsMapper codeGroupsMapper;

	@Autowired
	public CodeGroupsServiceImpl(CodeGroupsMongoRepository repo, SequenceGeneratorService sequenceGeneratorService,
			CodeGroupsMapper codeGroupsMapper) {
		super(repo, sequenceGeneratorService);
		this.codeGroupsMapper = codeGroupsMapper;
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

	public List<CodeGroupsDto> findByCodeList(String code, School school) {
		List<CodeGroups> list = ((CodeGroupsMongoRepository) repo).findByCodeAndSchoolOrderByPriority(code, school);
		return codeGroupsMapper.toDtos(list);
	}

//	public List<CodeGroupsDto> findByCodeDto(String code, School school) {
//		List<CodeGroups> codeGroups = ((CodeGroupsMongoRepository) repo).findByCodeAndSchoolOrderByPriority(code,
//				school);
//		return codeGroupsMapper.toDto(codeGroups);
//	}

	public CodeGroups findByCode(String code, School school) {
		return ((CodeGroupsMongoRepository) repo).findByCodeAndSchool(code, school);
	}

	@Override
	public CodeGroupsDto toDto(CodeGroups entity) {
		return codeGroupsMapper.toDto(entity);
	}

	@Override
	public CodeGroups toEntity(CodeGroupsDto dto) {
		return codeGroupsMapper.toEntity(dto);
	}

	@Override
	public Page<CodeGroupsDto> toDto(Page<CodeGroups> page) {
		return new PageImpl<CodeGroupsDto>(codeGroupsMapper.toDtos(page.getContent()), page.getPageable(),
				page.getTotalElements());
	}

	@Override
	public CodeGroupsDto saveDto(CodeGroupsDto dto, School school) {
		CodeGroups entity = toEntity(dto);
		log.info("save CodeGroups entity==>{}", entity);
		log.info("save CodeGroups schoolId==>{}", entity.getSchool());
		if (StringUtils.isBlank(entity.getId())) {
			String id = sequenceGeneratorService.nextSeq(CodeGroups.SEQUENCE_NAME);
			entity.setId(id);
		}

		entity.setSchool(school);

		return super.save(entity, school);
	}
}
