package com.sara.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.Address;
import com.sara.data.document.QAddress;
import com.sara.data.document.QStudent;
import com.sara.data.document.Student;
import com.sara.data.document.User;
import com.sara.data.repository.AddressMongoRepository;
import com.sara.service.AbstractService;

@Service
public class AddressServiceImpl extends AbstractService<Address, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());

	private AddressMongoRepository repository;

	@Autowired
	private StudentServiceImpl studentServiceImpl;
	@Autowired
	private UserServiceImpl userServiceImpl;
	@Autowired
	public AddressServiceImpl(AddressMongoRepository repo) {
		super(repo);
		this.repository = repo;
	}
	
	@Override
	public BooleanExpression getFindAllBooleanExpression(User user) {
		return null;
	}
	
	public Predicate findAllPredicate(User user, BooleanBuilder searchbb) {
		return searchbb.getValue();
	}
	
	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder searchbb, User user) {
		searchbb.or(QAddress.address.name.containsIgnoreCase(searchValue));
		searchbb.or(QAddress.address.address1.containsIgnoreCase(searchValue));
		searchbb.or(QAddress.address.address2.containsIgnoreCase(searchValue));
		searchbb.or(QAddress.address.city.containsIgnoreCase(searchValue));
		searchbb.or(QAddress.address.state.containsIgnoreCase(searchValue));
		searchbb.or(QAddress.address.zipCode.containsIgnoreCase(searchValue));
		searchbb.or(QAddress.address.country.containsIgnoreCase(searchValue));
	}

	@Override
	public Address getNewEntity() {
		return new Address();
	}

	public Iterable<Address> findByRefId(String refId, String searchValue) {
		BooleanBuilder booleanBuilder = new BooleanBuilder();
		booleanBuilder.and(QAddress.address.refId.eq(refId));
		if (searchValue != null && searchValue.trim().length() > 0) {
			BooleanBuilder booleanBuilder2 = new BooleanBuilder();

			booleanBuilder.and(booleanBuilder2.or(QAddress.address.name.containsIgnoreCase(searchValue))
					.or(QAddress.address.address1.containsIgnoreCase(searchValue))
					.or(QAddress.address.address2.containsIgnoreCase(searchValue))
					.or(QAddress.address.city.containsIgnoreCase(searchValue))
					.or(QAddress.address.state.containsIgnoreCase(searchValue))
					.or(QAddress.address.zipCode.containsIgnoreCase(searchValue))
					.or(QAddress.address.country.containsIgnoreCase(searchValue)));
		}
		Predicate predicate = booleanBuilder.getValue();
		return repository.findAll(predicate, Sort.by(Direction.ASC, "name"));
	}
	
	public List<Address> saveAll(List<Address> entities) {
		return repository.saveAll(entities);
	}
}
