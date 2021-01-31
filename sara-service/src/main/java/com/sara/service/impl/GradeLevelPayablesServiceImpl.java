package com.sara.service.impl;

import static org.springframework.data.mongodb.core.query.Criteria.where;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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
import com.sara.service.dtos.GradeLevelPayablesDto;
import com.sara.service.exception.GradeLevelPayablesResponseException;
import com.sara.service.mappers.GradeLevelPayablesMapper;

@Service
public class GradeLevelPayablesServiceImpl extends AbstractService<GradeLevelPayables, GradeLevelPayablesDto, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());
	private CodeGroupsServiceImpl codeGroupsServiceImpl;
	private MongoTemplate mongoTemplate;
	private GradeLevelPayablesMapper gradeLevelPayablesMapper;

	public GradeLevelPayablesServiceImpl(GradeLevelPayablesMongoRepository repo,
			SequenceGeneratorService sequenceGeneratorService, CodeGroupsServiceImpl codeGroupsServiceImpl,
			MongoTemplate mongoTemplate, GradeLevelPayablesMapper gradeLevelPayablesMapper) {
		super(repo, sequenceGeneratorService);
		this.codeGroupsServiceImpl = codeGroupsServiceImpl;
		this.mongoTemplate = mongoTemplate;
		this.gradeLevelPayablesMapper = gradeLevelPayablesMapper;
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

	public GradeLevelPayables findByLevelAndPeriod(CodeGroups level, CodeGroups period, School school)
			throws GradeLevelPayablesResponseException {
		log.debug("level=" + level);
//		List<GradeLevelPayables> list = ((GradeLevelPayablesMongoRepository) repo)
//				.findByLevelAndPeriodAndActiveOrderByAccountPayablesSettingsPriority(level, period, true);
		Criteria criteria = where("level").is(level).and("period").is(period).and("school").is(school);
//		Sort sort = by(Sort.Direction.DESC, "accountPayablesSettings");
		List<GradeLevelPayables> list = mongoTemplate.find(Query.query(criteria), GradeLevelPayables.class);

		log.debug("list=" + list);
		if (list.size() == 0) {
			throw new GradeLevelPayablesResponseException("Grade Level Payables has no active settings");
		}
		if (list.size() > 1) {
			throw new GradeLevelPayablesResponseException("Grade Level Payables has duplicate active settings.");
		}

		return list.get(0);

	}

	@Override
	public GradeLevelPayablesDto toDto(GradeLevelPayables entity) {
		return gradeLevelPayablesMapper.toDto(entity);
	}

	@Override
	public GradeLevelPayables toEntity(GradeLevelPayablesDto dto) {
		return gradeLevelPayablesMapper.toEntity(dto);
	}

	@Override
	public Page<GradeLevelPayablesDto> toDto(Page<GradeLevelPayables> page) {
		return new PageImpl<GradeLevelPayablesDto>(gradeLevelPayablesMapper.toDtos(page.getContent()),
				page.getPageable(), page.getTotalElements());
	}

	@Override
	public GradeLevelPayablesDto saveDto(GradeLevelPayablesDto dto, School school) {
		GradeLevelPayables entity = toEntity(dto);
		entity.setSchool(school);
		if (!StringUtils.isBlank(entity.getLevel().getId())) {
			CodeGroups level = codeGroupsServiceImpl.findById(entity.getLevel().getId());
			entity.setLevel(level);
		}
		if (!StringUtils.isBlank(entity.getPeriod().getId())) {
			CodeGroups period = codeGroupsServiceImpl.findById(entity.getPeriod().getId());
			entity.setPeriod(period);
		}

		return super.save(entity, school);
	}

}
