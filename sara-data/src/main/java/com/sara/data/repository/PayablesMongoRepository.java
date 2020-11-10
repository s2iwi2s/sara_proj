package com.sara.data.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;

import com.querydsl.core.types.dsl.StringPath;
import com.sara.data.document.Payables;
import com.sara.data.document.QPayables;
import com.sara.data.document.Student;

public interface PayablesMongoRepository
		extends SaraRepositoryInterface<Payables, String>, MongoRepository<Payables, String>,
		QuerydslPredicateExecutor<Payables>, QuerydslBinderCustomizer<QPayables> {

	List<Payables> findByStudent(Student student);
	
	@Override
	// for QuerydslBinderCustomizer
	default public void customize(QuerydslBindings bindings, QPayables root) {
		bindings.bind(String.class).first((StringPath path, String value) -> path.like(value));
	}
}
