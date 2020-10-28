package com.sara.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.sara.data.document.User;
import com.sara.data.document.QUser;
import com.sara.data.repository.EndUserMongoRepository;
import com.sara.service.AbstractService;

@Service
public class UserServiceImpl extends AbstractService<User, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());

	public UserServiceImpl(EndUserMongoRepository repo) {
		super(repo);
	}
//	private PasswordEncoder bcryptEncoder;

//	@Autowired
//	public EndUserServiceImpl(EndUserMongoRepository repo, PasswordEncoder bcryptEncoder) {
//		super(repo);
//		this.bcryptEncoder = bcryptEncoder;
//	}

	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder booleanBuilder) {
		booleanBuilder.or(QUser.user.firstName.containsIgnoreCase(searchValue));
		booleanBuilder.or(QUser.user.lastName.containsIgnoreCase(searchValue));
		booleanBuilder.or(QUser.user.userName.containsIgnoreCase(searchValue));
	}

	@Override
	public User getNewEntity() {
		return new User();
	}

	@Override
	public User save(User entity) {
		log.info("save entity={}", entity);
		if (entity.getId() !=null && entity.getId().length() > 0 && entity.getId().equalsIgnoreCase("-1") && (entity.getPassword() == null || entity.getPassword().trim().equals(""))) {
			User endUser = super.findById(entity.getId());
			entity.setPassword(endUser.getPassword());
			
		} else {
//			entity.setPassword(bcryptEncoder.encode(endUser.getPassword()));
		}
		entity = super.save(entity);
		return entity;
	}
}