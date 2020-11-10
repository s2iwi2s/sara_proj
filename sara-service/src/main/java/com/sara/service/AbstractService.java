package com.sara.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.QStudent;
import com.sara.data.document.User;
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

	@SuppressWarnings("unchecked")
	public List<T> findAll() {
		return ((MongoRepository<T, ID>)repo).findAll();
	}

	@Override
	@SuppressWarnings("unchecked")
	public Page<T> findAll(String searchValue, Pageable pageable, User user) {	
		BooleanBuilder searchbb = new BooleanBuilder();
		findAllQBuilder(searchValue, searchbb, user);
		
		Predicate predicate = findAllPredicate(user, searchbb);
		
		return ((QuerydslPredicateExecutor<T>)repo).findAll(predicate, pageable);
		//return findAll(pageable);
	}

	public Predicate findAllPredicate(User user, BooleanBuilder searchbb) {
		BooleanBuilder mainbb = new BooleanBuilder();
		BooleanExpression bex = getFindAllBooleanExpression(user);
		mainbb.and(bex);
		mainbb.and(searchbb);
		Predicate predicate = mainbb.getValue();
		return predicate;
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
