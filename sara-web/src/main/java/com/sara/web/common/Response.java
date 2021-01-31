package com.sara.web.common;

import org.springframework.data.domain.Page;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class Response<D> {
	private D entity;
	private Page<D> pagingList;
	private String searchValue;

	ListService listService;

	public Response(ListService listService) {
		this.listService = listService;
	}
}
