package com.sara.web.common;

import org.springframework.data.domain.Page;

import com.sara.web.beans.ResponseState;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class Response<T> extends ResponseState {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8921743646944631142L;
	private T entity;
	private Page<T> pagingList;
	private String searchValue;

	ListService<T> listService;

	public Response(ListService<T> listService) {
		this.listService = listService;
	}
}
