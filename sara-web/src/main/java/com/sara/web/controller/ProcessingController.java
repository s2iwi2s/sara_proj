package com.sara.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.Processing;
import com.sara.data.document.User;
import com.sara.service.dtos.ProcessingDto;
import com.sara.service.dtos.ProcessingRequestDto;
import com.sara.service.exception.ClosePeriodException;
import com.sara.service.exception.GradeLevelPayablesResponseException;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.ProcessingServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.common.Constants;
import com.sara.web.common.Response;
import com.sara.web.common.UserUtil;
import com.sara.web.controller.processing.ProcessingListService;
import com.sara.web.controller.processing.ProcessingResponse;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + ProcessingController.URL_BASE)
public class ProcessingController extends AbstractCrudController<Processing, ProcessingDto, String> {

	private static final Logger log = LoggerFactory.getLogger(ProcessingController.class);

	public static final String URL_BASE = "/processing";
	private ProcessingServiceImpl processingServiceImpl;

	public ProcessingController(UserServiceImpl userServiceImpl, CodeGroupsServiceImpl codeGroupsServiceImpl,
			ProcessingServiceImpl processingServiceImpl) {
		super(userServiceImpl, codeGroupsServiceImpl);
		this.processingServiceImpl = processingServiceImpl;
	}

	@Override
	public ProcessingServiceImpl getService() {
		return processingServiceImpl;
	}

	@Override
	public ProcessingResponse getResponse(User user) {
		return new ProcessingResponse(new ProcessingListService(codeGroupsServiceImpl, user.getSchool()));
	}

	@PatchMapping(Constants.URL_PROCESS_BY_PERIOD)
	public ResponseEntity<?> process(@RequestBody ProcessingRequestDto requestDto) throws ClosePeriodException, GradeLevelPayablesResponseException {
		log.info("process requestDto");
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		requestDto.setStatus(com.sara.service.Constants.PROCESS_STATUS_PENDING);
		log.info("{}", requestDto);
		processingServiceImpl.process(requestDto, user.getSchool());
		return new ResponseEntity<>(requestDto, HttpStatus.OK);
	}

	@GetMapping(Constants.URL_LIST + "/{type}")
	public ResponseEntity<?> list(@PathVariable("type") String type,@RequestParam("searchValue") String searchValue, @PageableDefault(sort = {
			"id" }, direction = Direction.ASC, page = Constants.DEFAULT_PAGE_NUMBER, size = Constants.DEFAULT_PAGE_SIZE) Pageable pageable) {
		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		Response<ProcessingDto> res = getResponse(user);
		res.setSearchValue(searchValue);

		Page<ProcessingDto> pagingList = null;
		pagingList = getService().findAll(searchValue, type, pageable, user);

		res.setPagingList(pagingList);
		res.setListService(null);
		return new ResponseEntity<Response<ProcessingDto>>(res, HttpStatus.OK);
	}
}
