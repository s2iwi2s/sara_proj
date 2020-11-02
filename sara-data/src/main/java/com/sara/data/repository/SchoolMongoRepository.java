package com.sara.data.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.sara.data.document.School;

public interface SchoolMongoRepository extends SaraRepositoryInterface<School, String>,
		MongoRepository<School, String>, QuerydslPredicateExecutor<School> {
}
