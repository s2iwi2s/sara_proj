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
import com.sara.data.document.Address;
import com.sara.data.document.QAddress;
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
	public void findAllQBuilder(String searchValue, BooleanBuilder booleanBuilder) {
		booleanBuilder.or(QAddress.address.name.containsIgnoreCase(searchValue));
		booleanBuilder.or(QAddress.address.address1.containsIgnoreCase(searchValue));
		booleanBuilder.or(QAddress.address.address2.containsIgnoreCase(searchValue));
		booleanBuilder.or(QAddress.address.city.containsIgnoreCase(searchValue));
		booleanBuilder.or(QAddress.address.state.containsIgnoreCase(searchValue));
		booleanBuilder.or(QAddress.address.zipCode.containsIgnoreCase(searchValue));
		booleanBuilder.or(QAddress.address.country.containsIgnoreCase(searchValue));
	}

	@Override
	public Address getNewEntity() {
		return new Address();
	}

	public Iterable<Address> findByEndUser(String userId, String searchValue) {
		BooleanBuilder booleanBuilder = new BooleanBuilder();
		booleanBuilder.and(QAddress.address.user.id.eq(userId));
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
	@Override
	public Address save(Address entity) {
//		User tempUser = entity.getUser();
//		if(tempUser != null && tempUser.getId() != null) {
//			log.info("address id={}, user id={}", entity.getId(),tempUser.getId());
//			tempUser = userServiceImpl.findById(tempUser.getId());
//			entity.setUser(tempUser);
//		}
//		Student tempStudent = entity.getStudent();
//		if(tempStudent != null && tempStudent.getId() != null) {
//			tempStudent = studentServiceImpl.findById(tempStudent.getId());
//			entity.setStudent(tempStudent);
//		}		
		entity = super.save(entity);
		
		User tempUser = entity.getUser();
		if(tempUser != null && tempUser.getId() != null) {
			final User user = userServiceImpl.findById(tempUser.getId());
			List<Address> addressList = repository.findByUser(tempUser.getId());
			user.setAddress(addressList);
			userServiceImpl.save(user);
		}
		Student tempStudent = entity.getStudent();
		if(tempStudent != null && tempStudent.getId() != null) {
			final Student student = studentServiceImpl.findById(tempStudent.getId());
			List<Address> addressList = repository.findByUser(tempStudent.getId());
			student.setAddress(addressList);
			studentServiceImpl.save(student);
		}
		return entity;
	}
	public List<Address> saveAll(List<Address> entities) {
		return repository.saveAll(entities);
	}
}
