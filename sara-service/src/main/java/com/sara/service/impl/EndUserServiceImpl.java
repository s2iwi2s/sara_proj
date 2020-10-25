package com.sara.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.sara.data.document.EndUser;
import com.sara.data.document.QEndUser;
import com.sara.data.repository.EndUserMongoRepository;
import com.sara.service.AbstractService;

@Service
public class EndUserServiceImpl extends AbstractService<EndUser, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());

	public EndUserServiceImpl(EndUserMongoRepository repo) {
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
		booleanBuilder.or(QEndUser.endUser.firstName.containsIgnoreCase(searchValue));
		booleanBuilder.or(QEndUser.endUser.lastName.containsIgnoreCase(searchValue));
		booleanBuilder.or(QEndUser.endUser.userName.containsIgnoreCase(searchValue));
	}

	@Override
	public EndUser getNewEntity() {
		return new EndUser();
	}

	@Override
	public EndUser save(EndUser entity) {
		if (entity.getPassword() == null || entity.getPassword().trim().equals("")) {
			EndUser endUser = super.findById(entity.getId());
			entity.setPassword(endUser.getPassword());
			super.save(entity);
		} else {
//			entity.setPassword(bcryptEncoder.encode(endUser.getPassword()));
		}

		return entity;
	}
}
