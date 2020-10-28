package com.sara.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.sara.service.AbstractService;
import com.sara.web.beans.ResponseStatus;
import com.sara.web.common.Constants;
import com.sara.web.common.Response;

public abstract class AbstractCrudController<T, ID> {
	
	private static final Logger log = LoggerFactory.getLogger(AbstractCrudController.class);


	public abstract AbstractService<T, ID> getService();

	public abstract Response<T> getResponse();

	public AbstractCrudController() {
	}

	@GetMapping(Constants.URL_LIST)
	public Response<T> list(@RequestParam("searchValue") String searchValue, @PageableDefault(sort = {
			"id" }, direction = Direction.ASC, page = Constants.DEFAULT_PAGE_NUMBER, size = Constants.DEFAULT_PAGE_SIZE) Pageable pageable) {
		Response<T> res = getResponse();
		ResponseStatus status = new ResponseStatus();
		res.setResponseStatus(status);
		res.setSearchValue(searchValue);

		Page<T> pagingList = null;
		try {
			pagingList = getService().findAll(searchValue, pageable);
			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			status.setException(e);
			e.printStackTrace();
		}
		res.setPagingList(pagingList);
		res.setListService(null);
		return res;
	}

	@DeleteMapping(Constants.URL_DELETE)
	public Response<T> delete(@PathVariable("id") ID id) {
		ResponseStatus status = new ResponseStatus();
		Response<T> res = getResponse();
		res.setResponseStatus(status);
		try {
			getService().deleteById(id);
			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setException(e);
		}
		return res;
	}

	@GetMapping(Constants.URL_DETAILS)
	public Response<T> details(@PathVariable("id") ID id) {
		T entity = null;
		ResponseStatus status = new ResponseStatus();
		Response<T> res = getResponse();
		res.setResponseStatus(status);

		try {
			entity = getService().findById(id);
			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setException(e);
		}

		res.setEntity(entity);
		return res;
	}

	@PostMapping(path = Constants.URL_SAVE, consumes = { MediaType.APPLICATION_JSON_VALUE })
	public T save(@RequestBody T entity) {
		ResponseStatus status = new ResponseStatus();
		Response<T> res = getResponse();
		res.setResponseStatus(status);
		try {
			log.info("entity==> {}", entity);
			getService().save(entity);
			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			status.setException(e);
			e.printStackTrace();
		}
		res.setEntity(entity);
		return entity;
	}
}
