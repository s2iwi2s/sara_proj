package com.sara.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.querydsl.core.BooleanBuilder;

public interface ServiceInterface<T, ID> {
	public Page<T> findAll(String searchValue, Pageable pageable);

	public void findAllQBuilder(String searchValue, BooleanBuilder booleanBuilder);

	public T getNewEntity();

	public void deleteById(ID id);

	public T findById(ID id);

	public T save(T entity);
}
