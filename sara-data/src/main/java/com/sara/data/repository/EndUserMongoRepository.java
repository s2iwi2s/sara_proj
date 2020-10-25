package com.sara.data.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.sara.data.document.EndUser;

public interface EndUserMongoRepository extends SaraRepositoryInterface<EndUser, String>,
		MongoRepository<EndUser, String>, QuerydslPredicateExecutor<EndUser> {
	public EndUser findByUserName(String userName);
}
