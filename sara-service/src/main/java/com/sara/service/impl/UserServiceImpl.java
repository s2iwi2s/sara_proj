package com.sara.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.QStudent;
import com.sara.data.document.QUser;
import com.sara.data.document.User;
import com.sara.data.repository.UserMongoRepository;
import com.sara.service.AbstractService;

@Service
public class UserServiceImpl extends AbstractService<User, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());
	
	private UserMongoRepository repository;
	
	@Autowired
	public UserServiceImpl(UserMongoRepository repo) {
		super(repo);
		this.repository = repo;
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
	public User save(User entity) {
		log.info("save entity={}", entity);
		if (entity.getId() != null && entity.getId().length() > 0 && !(entity.getId().equalsIgnoreCase("-1")
				|| entity.getPassword() == null || entity.getPassword().trim().equals(""))) {
			User endUser = super.findById(entity.getId());
			entity.setPassword(endUser.getPassword());
		} else {
			entity.setPassword("$2a$10$fdxH3igDJy0ZKUdpKWtAsuri0GRed6sO14NTxchvC5PdyztTD4ztm");
		}
		entity = super.save(entity);
		return entity;
	}
	
	public User findByUserName(String userName){
		return repository.findByUserName(userName);
	}
}
