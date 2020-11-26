package com.sara.service.impl;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.QUser;
import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.data.repository.UserMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;

@Service
public class UserServiceImpl extends AbstractService<User, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());
	private PasswordEncoder passwordEncoder;

	public UserServiceImpl(UserMongoRepository repo, SequenceGeneratorService sequenceGeneratorService) {
		super(repo, sequenceGeneratorService);
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
		searchbb.or(QUser.user.firstName.containsIgnoreCase(searchValue));
		searchbb.or(QUser.user.lastName.containsIgnoreCase(searchValue));
		searchbb.or(QUser.user.userName.containsIgnoreCase(searchValue));
	}

	@Override
	public User getNewEntity() {
		return new User();
	}

	@Override
	public User save(User entity, School school) {
		if (!StringUtils.isBlank(entity.getId()) && StringUtils.isBlank(entity.getPassword())) {
			User endUser = super.findById(entity.getId());
			entity.setPassword(endUser.getPassword());
		} else {
			entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		}
		entity = super.save(entity, school);
		return entity;
	}

	public User findByUserName(String userName) {
		return ((UserMongoRepository) repo).findByUserName(userName);
	}
}
