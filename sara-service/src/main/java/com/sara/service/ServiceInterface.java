package com.sara.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.School;
import com.sara.data.document.User;

public interface ServiceInterface<T, D, ID> {
	public D toDto(T entity);

	public T toEntity(D dto);

	public Page<D> toDto(Page<T> page);

	public Page<D> findAll(String searchValue, Pageable pageable, User user);

	public List<T> findAll();

	public void findAllQBuilder(String searchValue, BooleanBuilder mainbb, User user);

	public BooleanExpression getFindAllBooleanExpression(User user);

	public void deleteById(ID id);

	public T findById(ID id);
	public D findByIdDto(ID id);

	public D saveDto(D dto, School school);
	public D save(T entity, School school);

}
