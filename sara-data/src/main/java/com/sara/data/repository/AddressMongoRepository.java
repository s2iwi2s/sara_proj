package com.sara.data.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.sara.data.document.Address;

public interface AddressMongoRepository extends SaraRepositoryInterface<Address, String>,
		MongoRepository<Address, String>, QuerydslPredicateExecutor<Address> {
	List<Address> findByUser(String id);
}
