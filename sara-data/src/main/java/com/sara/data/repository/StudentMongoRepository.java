package com.sara.data.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.sara.data.document.Student;

public interface StudentMongoRepository extends SaraRepositoryInterface<Student, String>,
		MongoRepository<Student, String>, QuerydslPredicateExecutor<Student> {
}
