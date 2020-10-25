package com.sara.data.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.sara.data.document.Address;

public interface AddressMongoRepository extends SaraRepositoryInterface<Address, String>,
		MongoRepository<Address, String>, QuerydslPredicateExecutor<Address> {
}
