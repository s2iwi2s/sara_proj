package com.sara.data.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.sara.data.document.Role;

public interface RoleMongoRepository extends SaraRepositoryInterface<Role, String>,
		MongoRepository<Role, String>, QuerydslPredicateExecutor<Role> {

}
