package com.sara.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.sara.data.document.User;
import com.sara.service.AbstractService;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.beans.ResponseStatus;
import com.sara.web.common.Constants;
import com.sara.web.common.Response;
import com.sara.web.common.UserUtil;

public abstract class AbstractCrudController<T, ID> {
	
	private static final Logger log = LoggerFactory.getLogger(AbstractCrudController.class);


	public abstract AbstractService<T, ID> getService();

	public abstract Response<T> getResponse(User user);

	protected UserServiceImpl userServiceImpl;
	protected CodeGroupsServiceImpl codeGroupsServiceImpl;
	
	public AbstractCrudController(UserServiceImpl userServiceImpl, CodeGroupsServiceImpl codeGroupsServiceImpl) {
		this.userServiceImpl = userServiceImpl;
		this.codeGroupsServiceImpl = codeGroupsServiceImpl;
	}

	@GetMapping(Constants.URL_LIST)
	public ResponseEntity<?> list(@RequestParam("searchValue") String searchValue, @PageableDefault(sort = {
			"id" }, direction = Direction.ASC, page = Constants.DEFAULT_PAGE_NUMBER, size = Constants.DEFAULT_PAGE_SIZE) Pageable pageable) {

		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		Response<T> res = getResponse(user);
		ResponseStatus status = new ResponseStatus();
		res.setResponseStatus(status);
		res.setSearchValue(searchValue);

		Page<T> pagingList = null;
		try {
			pagingList = getService().findAll(searchValue, pageable, user);
			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			status.setException(e);
			e.printStackTrace();
		}
		res.setPagingList(pagingList);
		res.setListService(null);
		return new ResponseEntity<Response<T>>(res, HttpStatus.OK);
	}

	@DeleteMapping(Constants.URL_DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") ID id) {
		ResponseStatus status = new ResponseStatus();
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		Response<T> res = getResponse(user);
		res.setResponseStatus(status);
		try {
			getService().deleteById(id);
			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setException(e);
		}

		return new ResponseEntity<Response<T>>(res, HttpStatus.OK);
	}

	@GetMapping(Constants.URL_DETAILS)
	public ResponseEntity<?> details(@PathVariable("id") ID id) {
		T entity = null;
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		ResponseStatus status = new ResponseStatus();
		Response<T> res = getResponse(user);
		res.setResponseStatus(status);

		try {
			entity = getService().findById(id);
			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setException(e);
		}

		res.setEntity(entity);
		
		return new ResponseEntity<Response<T>>(res, HttpStatus.OK);
	}

	@GetMapping(Constants.URL_OPTIONS)
	public ResponseEntity<?> options() {
		T entity = null;
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		ResponseStatus status = new ResponseStatus();
		Response<T> res = getResponse(user);
		res.setResponseStatus(status);

		try {
			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setException(e);
		}

		res.setEntity(entity);
		
		return new ResponseEntity<Response<T>>(res, HttpStatus.OK);
	}

	@PostMapping(path = Constants.URL_SAVE, consumes = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<?> save(@RequestBody T entity) {
		log.debug("save entity => {}", entity);
		ResponseStatus status = new ResponseStatus();
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		Response<T> res = getResponse(user);
		res.setResponseStatus(status);
		try {
			entity = getService().save(entity, user.getSchool());
			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			status.setException(e);
			e.printStackTrace();
		}
		res.setEntity(entity);
		//return entity;
		return new ResponseEntity<Response<T>>(res, HttpStatus.OK);
	}
}
