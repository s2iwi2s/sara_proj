package com.sara.service.impl;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.AccountPayablesSettings;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.QAccountPayablesSettings;
import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.data.repository.AccountPayablesSettingsMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;
import com.sara.service.exception.NotFoundException;

@Service
public class AccountPayablesSettingsServiceImpl extends AbstractService<AccountPayablesSettings, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());

	private CodeGroupsServiceImpl codeGroupsServiceImpl;

	public AccountPayablesSettingsServiceImpl(AccountPayablesSettingsMongoRepository repo,
			SequenceGeneratorService sequenceGeneratorService, CodeGroupsServiceImpl codeGroupsServiceImpl) {
		super(repo, sequenceGeneratorService);
		this.codeGroupsServiceImpl = codeGroupsServiceImpl;
	}

	@Override
	public BooleanExpression getFindAllBooleanExpression(User user) {
		return QAccountPayablesSettings.accountPayablesSettings.school.eq(user.getSchool());
	}

	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder searchbb, User user) {
		searchbb.or(QAccountPayablesSettings.accountPayablesSettings.description.containsIgnoreCase(searchValue));
//		searchbb.or(QAccountPayablesSettings.accountPayablesSettings.paymentPeriod.description
//				.containsIgnoreCase(searchValue));
	}

	@Override
	public AccountPayablesSettings getNewEntity() {
		return new AccountPayablesSettings();
	}

	@Override
	public AccountPayablesSettings save(AccountPayablesSettings entity, School school) {
		entity.setSchool(school);
		if (entity.getPeriod() != null && !StringUtils.isBlank(entity.getPeriod().getId())) {
			CodeGroups period = codeGroupsServiceImpl.findById(entity.getPeriod().getId());
			entity.setPeriod(period);
		}

		if (entity.getPaymentPeriod() != null && !StringUtils.isBlank(entity.getPaymentPeriod().getId())) {
			CodeGroups paymentPeriod = codeGroupsServiceImpl.findById(entity.getPaymentPeriod().getId());
			entity.setPaymentPeriod(paymentPeriod);
		}
		entity = super.save(entity, school);
		return entity;
	}

	public List<AccountPayablesSettings> findByApplyToAllList(School school, String periodId) {
		CodeGroups period = codeGroupsServiceImpl.findById(periodId);
//
//		Criteria criteria = where("period").is(period).and("school").is(school);
////		Sort sort = by(Sort.Direction.DESC, "accountPayablesSettings");
//		List<AccountPayablesSettings> list = mongoTemplate.find(Query.query(criteria), AccountPayablesSettings.class);

		return ((AccountPayablesSettingsMongoRepository) repo)
				.findByActiveAndApplyToAllAndSchoolAndPeriodOrderByPriority(true, true, school, period);
		// return findAll(pageable);
	}

	public Page<AccountPayablesSettings> findAllActiveList(String period, String searchValue, Pageable pageable,
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
		return repo.findAll(searchbb.getValue(), pageable);
	}
}
