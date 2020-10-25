package com.sara.data.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;

import com.querydsl.core.types.dsl.StringPath;
import com.sara.data.common.Constants;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.QCodeGroups;

public interface CodeGroupsMongoRepository
		extends SaraRepositoryInterface<CodeGroups, String>, MongoRepository<CodeGroups, String>,
		QuerydslPredicateExecutor<CodeGroups>, QuerydslBinderCustomizer<QCodeGroups> {
	@Query(Constants.CODE_GROUPS_QUERY)
	public List<CodeGroups> findByDistinctCode();

	@Override
	// for QuerydslBinderCustomizer
	default public void customize(QuerydslBindings bindings, QCodeGroups root) {
		bindings.bind(String.class).first((StringPath path, String value) -> path.like(value));
	}
}
