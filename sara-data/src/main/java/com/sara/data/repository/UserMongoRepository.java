package com.sara.data.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.sara.data.document.User;

public interface UserMongoRepository extends SaraRepositoryInterface<User, String>,
		MongoRepository<User, String>, QuerydslPredicateExecutor<User> {
	public User findByUserName(String userName);
}
