package com.sara.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.User;

public interface ServiceInterface<T, ID> {
	public Page<T> findAll(String searchValue, Pageable pageable, User user);
	public List<T> findAll();
	public void findAllQBuilder(String searchValue, BooleanBuilder mainbb, User user);
	public BooleanExpression getFindAllBooleanExpression(User user);

	public T getNewEntity();

	public void deleteById(ID id);

	public T findById(ID id);

	public T save(T entity);
}
