package com.sara.data.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.sara.data.document.AuthorizedUrl;

public interface AuthorizedUrlMongoRepository extends SaraRepositoryInterface<AuthorizedUrl, String>,
		MongoRepository<AuthorizedUrl, String>, QuerydslPredicateExecutor<AuthorizedUrl> {
	List<AuthorizedUrl> findByPermit(boolean permit);
}