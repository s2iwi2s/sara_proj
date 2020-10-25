package com.sara.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.sara.data.repository.SaraRepositoryInterface;

public abstract class AbstractService<T, ID> implements ServiceInterface<T, ID> {
	private SaraRepositoryInterface<T, ID> repo;
//	private MongoRepository<T, ID> repo1;
//	private QuerydslPredicateExecutor<T> repo3;

	public AbstractService(SaraRepositoryInterface<T, ID> repo) {
		this.repo = repo;
	}

	@SuppressWarnings("unchecked")
	public Page<T> findAll(Pageable pageable) {
		return ((MongoRepository<T, ID>)repo).findAll(pageable);
	}

	@Override
	@SuppressWarnings("unchecked")
	public Page<T> findAll(String searchValue, Pageable pageable) {
		if (searchValue != null && searchValue.trim().length() > 0) {
			BooleanBuilder booleanBuilder = new BooleanBuilder();
			findAllQBuilder(searchValue, booleanBuilder);
			Predicate predicate = booleanBuilder.getValue();
			return ((QuerydslPredicateExecutor<T>)repo).findAll(predicate, pageable);
		}

		return findAll(pageable);
	}

	@Override
	@SuppressWarnings("unchecked")
	public void deleteById(ID id) {
		((MongoRepository<T, ID>)repo).deleteById(id);
	}

	@Override
	@SuppressWarnings("unchecked")
	public T findById(ID id) {
		if (id == null || "-1".equals(id)) {
			return getNewEntity();
		}
		return ((MongoRepository<T, ID>) repo).findById(id).get();
	}

	@Override
	@SuppressWarnings("unchecked")
	public T save(T entity) {
		return ((MongoRepository<T, ID>)repo).save(entity);
	}

}
