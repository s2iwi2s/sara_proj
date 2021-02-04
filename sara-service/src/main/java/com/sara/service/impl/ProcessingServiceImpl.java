package com.sara.service.impl;

import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.Processing;
import com.sara.data.document.QProcessing;
import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.data.repository.ProcessingMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.Constants;
import com.sara.service.SequenceGeneratorService;
import com.sara.service.dtos.ProcessingDto;
import com.sara.service.dtos.ProcessingRequestDto;
import com.sara.service.exception.ClosePeriodException;
import com.sara.service.exception.GradeLevelPayablesResponseException;
import com.sara.service.mappers.ProcessingMapper;

@Service
public class ProcessingServiceImpl extends AbstractService<Processing, ProcessingDto, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());

	private CodeGroupsServiceImpl codeGroupsServiceImpl;
	private ProcessingMapper processMapper;
	private PayablesServiceImpl payablesServiceImpl;

	public ProcessingServiceImpl(ProcessingMongoRepository repo, SequenceGeneratorService sequenceGeneratorService,
			CodeGroupsServiceImpl codeGroupsServiceImpl, ProcessingMapper processMapper,
			PayablesServiceImpl payablesServiceImpl) {
		super(repo, sequenceGeneratorService);
		this.codeGroupsServiceImpl = codeGroupsServiceImpl;
		this.processMapper = processMapper;
		this.payablesServiceImpl = payablesServiceImpl;
	}

	@Override
	public BooleanExpression getFindAllBooleanExpression(User user) {
		return QProcessing.processing.school.eq(user.getSchool());
	}

	@Override
	public Predicate findAllPredicate(User user, BooleanBuilder searchbb) {
		return searchbb.getValue();
	}

	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder searchbb, User user) {
		searchbb.or(QProcessing.processing.type.containsIgnoreCase(searchValue));
		searchbb.or(QProcessing.processing.status.containsIgnoreCase(searchValue));
	}

	public Page<ProcessingDto> findAll(String searchValue, String type, Pageable pageable, User user) {
		BooleanBuilder searchbb = new BooleanBuilder();
		findAllQBuilder(searchValue, type, searchbb, user);

		Predicate predicate = findAllPredicate(user, searchbb);
		return toDto(repo.findAll(predicate, pageable));
	}

	public void findAllQBuilder(String searchValue, String type, BooleanBuilder searchbb, User user) {
		searchbb.or(QProcessing.processing.type.containsIgnoreCase(type));
		searchbb.or(QProcessing.processing.jsonParams.containsIgnoreCase(searchValue));
		searchbb.or(QProcessing.processing.status.containsIgnoreCase(searchValue));
	}

	@Override
	public ProcessingDto saveDto(ProcessingDto dto, School school) {
		Processing entity = toEntity(dto);
		if (entity.getId() == null || entity.getId().trim().length() == 0) {
			String id = sequenceGeneratorService.nextSeq(Processing.SEQUENCE_NAME);
			entity.setId(id);
		}
		return super.save(entity, school);
	}

	@Override
	public ProcessingDto toDto(Processing entity) {
		return processMapper.toDto(entity);
	}

	@Override
	public Processing toEntity(ProcessingDto dto) {
		return processMapper.toEntity(dto);
	}

	@Override
	public Page<ProcessingDto> toDto(Page<Processing> page) {
		return new PageImpl<ProcessingDto>(processMapper.toDtos(page.getContent()), page.getPageable(),
				page.getTotalElements());
	}

	public void process(ProcessingRequestDto dto, School school) throws ClosePeriodException, GradeLevelPayablesResponseException {
		if (Constants.PROCESS_CLOSE_PERIOD.equals(dto.getType())) {
			processClosePeriod(dto, school);
		}
	}

	public void processClosePeriod(ProcessingRequestDto dto, School school) throws ClosePeriodException, GradeLevelPayablesResponseException {
		HashMap<String, String> params = dto.getParams();

		String fromPeriodId = params.get("fromPeriodId");
		CodeGroups fromPeriod = codeGroupsServiceImpl.findById(fromPeriodId);

		String toPeriodId = params.get("toPeriodId");
		CodeGroups toPeriod = codeGroupsServiceImpl.findById(toPeriodId);
		
		validateClosePeriodParameters(school, fromPeriod, toPeriod);
		
		Processing processing = saveClosePeriodParam(dto.getType(), dto.getStatus(), fromPeriod, toPeriod, school);
		
		String status = Constants.PROCESS_STATUS_COMPLETED;
		String statusMessage = "Completed";
		try {
			payablesServiceImpl.processPayables(processing, fromPeriod, toPeriod, school);
		} catch (ClosePeriodException e) {
			status = Constants.PROCESS_STATUS_FAILED;
			statusMessage = e.getMessage();
		}
		
		updateProcessStatus(processing, status, statusMessage);
	}

	private void updateProcessStatus(Processing processing, String status, String statusMessage) {
		processing.setStatus(status);
		processing.setStatusMessage(statusMessage);
		repo.save(processing);
	}

	private void validateClosePeriodParameters(School school, CodeGroups fromPeriod, CodeGroups toPeriod)
			throws ClosePeriodException {
		if(!school.getCurrentPeriod().getId().equals(fromPeriod.getId())) {
			throw new ClosePeriodException(String.format("Invalid \"From Period\" %s. The \"Current period\" is %s", fromPeriod.getDescription(),school.getCurrentPeriodDesc()));
		} else if(fromPeriod.getId().equals(toPeriod.getId())) {
			throw new ClosePeriodException(String.format("Invalid \"From Period\" %s should not be equal to \"To Period\" %s", fromPeriod.getDescription(),toPeriod.getDescription()));
		}
	}

	private Processing saveClosePeriodParam(String type, String status, CodeGroups fromPeriod, CodeGroups toPeriod,
			School school) {
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("fromPeriod", fromPeriod.getDescription());
		params.put("toPeriod", toPeriod.getDescription());
		log.info("saveClosePeriodParam params = {}", params);
		String jsonParams = "{}";
		try {
			ObjectMapper jsonObjMap = new ObjectMapper();// .enable(SerializationFeature.INDENT_OUTPUT);
			jsonParams = jsonObjMap.writeValueAsString(params);
		} catch (JsonProcessingException e) {
			// e.printStackTrace();
		}
		Processing entity = new Processing(type, status, jsonParams, school);
		return repo.save(entity);
	}
}
