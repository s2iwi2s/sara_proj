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
import com.sara.web.common.Constants;
import com.sara.web.common.Response;
import com.sara.web.common.UserUtil;

public abstract class AbstractCrudController<T, D, ID> {

	private static final Logger log = LoggerFactory.getLogger(AbstractCrudController.class);

	public abstract AbstractService<T, D, ID> getService();

	public abstract Response<D> getResponse(User user);

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
		Response<D> res = getResponse(user);
		res.setSearchValue(searchValue);

		Page<D> pagingList = null;
		pagingList = getService().findAll(searchValue, pageable, user);

		res.setPagingList(pagingList);
		res.setListService(null);
		return new ResponseEntity<Response<D>>(res, HttpStatus.OK);
	}

	@DeleteMapping(Constants.URL_DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") ID id) {
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		Response<D> res = getResponse(user);
		getService().deleteById(id);

		return new ResponseEntity<Response<D>>(res, HttpStatus.OK);
	}

	@GetMapping(Constants.URL_DETAILS)
	public ResponseEntity<?> details(@PathVariable("id") ID id) {
		D entity = null;
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);

		Response<D> res = getResponse(user);
		entity = getService().findByIdDto(id);
		res.setEntity(entity);

		return new ResponseEntity<Response<D>>(res, HttpStatus.OK);
	}

	@GetMapping(Constants.URL_OPTIONS)
	public ResponseEntity<?> options() {
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		Response<D> res = getResponse(user);
		return new ResponseEntity<Response<D>>(res, HttpStatus.OK);
	}

	@PostMapping(path = Constants.URL_SAVE, consumes = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<?> save(@RequestBody D dto) {
		log.debug("save dto => {}", dto);
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		Response<D> res = getResponse(user);
		dto = getService().saveDto(dto, user.getSchool());
		res.setEntity(dto);
		return new ResponseEntity<Response<D>>(res, HttpStatus.OK);
	}
}
