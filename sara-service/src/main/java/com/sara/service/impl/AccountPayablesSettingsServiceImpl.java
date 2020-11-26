package com.sara.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.AccountPayablesSettings;
import com.sara.data.document.QAccountPayablesSettings;
import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.data.repository.AccountPayablesSettingsMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;

@Service
public class AccountPayablesSettingsServiceImpl extends AbstractService<AccountPayablesSettings, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());

	public AccountPayablesSettingsServiceImpl(AccountPayablesSettingsMongoRepository repo, SequenceGeneratorService sequenceGeneratorService) {
		super(repo, sequenceGeneratorService);
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
		return super.save(entity, school);
	}
}
