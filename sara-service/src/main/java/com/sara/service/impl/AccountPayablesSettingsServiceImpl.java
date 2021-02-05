package com.sara.service.impl;

import java.util.List;

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
import com.sara.data.document.AccountPayablesSettings;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.QAccountPayablesSettings;
import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.data.repository.AccountPayablesSettingsMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;
import com.sara.service.dtos.AccountPayablesSettingsDto;
import com.sara.service.exception.NotFoundException;
import com.sara.service.mappers.AccountPayablesSettingsMapper;

@Service
public class AccountPayablesSettingsServiceImpl
		extends AbstractService<AccountPayablesSettings, AccountPayablesSettingsDto, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());

	private CodeGroupsServiceImpl codeGroupsServiceImpl;
	private AccountPayablesSettingsMapper accountPayablesSettingsMapper;

	public AccountPayablesSettingsServiceImpl(AccountPayablesSettingsMongoRepository repo,
			SequenceGeneratorService sequenceGeneratorService, CodeGroupsServiceImpl codeGroupsServiceImpl,
			AccountPayablesSettingsMapper accountPayablesSettingsMapper) {
		super(repo, sequenceGeneratorService);
		this.codeGroupsServiceImpl = codeGroupsServiceImpl;
		this.accountPayablesSettingsMapper = accountPayablesSettingsMapper;
	}

	public Page<AccountPayablesSettingsDto> findAll(String periodId, String searchValue, Pageable pageable, User user) {
		BooleanBuilder searchbb = new BooleanBuilder();
		findAllQBuilder(searchValue, searchbb, user);

		Predicate predicate = findAllPredicate(periodId, user, searchbb);
		log.info("[findAll] predicate={}", predicate);
		// return repo.findAll(predicate, pageable);
		return toDto(repo.findAll(predicate, pageable));
	}

	public Predicate findAllPredicate(String periodId, User user, BooleanBuilder searchbb) {
		BooleanBuilder mainbb = new BooleanBuilder();
		log.info("[findAllPredicate] periodId={}", periodId);
		if(!"all".equalsIgnoreCase(periodId)) {
			mainbb.and(QAccountPayablesSettings.accountPayablesSettings.period.id.eq(periodId));
		}

		BooleanExpression bex = getFindAllBooleanExpression(user);
		mainbb.and(bex);

		mainbb.and(searchbb);
		Predicate predicate = mainbb.getValue();
		return predicate;
	}

	@Override
	public BooleanExpression getFindAllBooleanExpression(User user) {
		return QAccountPayablesSettings.accountPayablesSettings.school.eq(user.getSchool());
	}

	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder searchbb, User user) {
		searchbb.or(QAccountPayablesSettings.accountPayablesSettings.description.containsIgnoreCase(searchValue));
	}

	public List<AccountPayablesSettingsDto> findByApplyToAllList(School school, String periodId) {
		CodeGroups period = codeGroupsServiceImpl.findById(periodId);
//
//		Criteria criteria = where("period").is(period).and("school").is(school);
////		Sort sort = by(Sort.Direction.DESC, "accountPayablesSettings");
//		List<AccountPayablesSettings> list = mongoTemplate.find(Query.query(criteria), AccountPayablesSettings.class);
		List<AccountPayablesSettings> list = ((AccountPayablesSettingsMongoRepository) repo)
				.findByActiveAndApplyToAllAndSchoolAndPeriodOrderByPriority(true, true, school, period);
		return accountPayablesSettingsMapper.toDtos(list);
	}

	public Page<AccountPayablesSettingsDto> findAllActiveList(String period, String searchValue, Pageable pageable,
			User user) throws NotFoundException {
		if (period == null) {
			throw new NotFoundException("No Accounts Payables Settings found");
		}

		BooleanBuilder searchbb = new BooleanBuilder();
		if (period != null) {
			searchbb.and(QAccountPayablesSettings.accountPayablesSettings.period.eq(new CodeGroups(period)));
		}

		searchbb.and(QAccountPayablesSettings.accountPayablesSettings.applyToAll.eq(false));
		searchbb.and(QAccountPayablesSettings.accountPayablesSettings.active.eq(true));
		searchbb.and(QAccountPayablesSettings.accountPayablesSettings.description.containsIgnoreCase(searchValue));
		searchbb.and(QAccountPayablesSettings.accountPayablesSettings.school.eq(user.getSchool()));
		return toDto(repo.findAll(searchbb.getValue(), pageable));
	}

	@Override
	public AccountPayablesSettingsDto toDto(AccountPayablesSettings entity) {
		return accountPayablesSettingsMapper.toDto(entity);
	}

	@Override
	public AccountPayablesSettings toEntity(AccountPayablesSettingsDto dto) {
		return accountPayablesSettingsMapper.toEntity(dto);
	}

	@Override
	public Page<AccountPayablesSettingsDto> toDto(Page<AccountPayablesSettings> page) {
		return new PageImpl<AccountPayablesSettingsDto>(accountPayablesSettingsMapper.toDtos(page.getContent()),
				page.getPageable(), page.getTotalElements());
	}

	@Override
	public AccountPayablesSettingsDto saveDto(AccountPayablesSettingsDto dto, School school) {
		AccountPayablesSettings entity = accountPayablesSettingsMapper.toEntity(dto);
		entity.setSchool(school);
		if (entity.getPeriod() != null && !StringUtils.isBlank(entity.getPeriod().getId())) {
			CodeGroups period = codeGroupsServiceImpl.findById(entity.getPeriod().getId());
			entity.setPeriod(period);
		}

		if (entity.getPaymentPeriod() != null && !StringUtils.isBlank(entity.getPaymentPeriod().getId())) {
			CodeGroups paymentPeriod = codeGroupsServiceImpl.findById(entity.getPaymentPeriod().getId());
			entity.setPaymentPeriod(paymentPeriod);
		}
		return super.save(entity, school);
	}
}
