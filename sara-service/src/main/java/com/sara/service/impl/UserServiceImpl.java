package com.sara.service.impl;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.QUser;
import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.data.repository.UserMongoRepository;
import com.sara.service.AbstractService;
import com.sara.service.SequenceGeneratorService;
import com.sara.service.dtos.UserDto;
import com.sara.service.mappers.UserMapper;

@Service
public class UserServiceImpl extends AbstractService<User, UserDto, String> {
	Logger log = LoggerFactory.getLogger(this.getClass());
	private PasswordEncoder passwordEncoder;
	private UserMapper userMapper;

	public UserServiceImpl(UserMongoRepository repo, SequenceGeneratorService sequenceGeneratorService,
			PasswordEncoder passwordEncoder, UserMapper userMapper) {
		super(repo, sequenceGeneratorService);
		this.passwordEncoder = passwordEncoder;
		this.userMapper = userMapper;
	}

	@Override
	public UserDto toDto(User entity) {
		return userMapper.toDto(entity);
	}

	@Override
	public User toEntity(UserDto dto) {
		return userMapper.toEntity(dto);
	}

	public Page<UserDto> toDto(Page<User> page) {
		return new PageImpl<UserDto>(userMapper.toDtos(page.getContent()), page.getPageable(), page.getTotalElements());
	}

	@Override
	public BooleanExpression getFindAllBooleanExpression(User user) {
		return null;
	}

	@Override
	public Predicate findAllPredicate(User user, BooleanBuilder searchbb) {
		return searchbb.getValue();
	}

	@Override
	public void findAllQBuilder(String searchValue, BooleanBuilder searchbb, User user) {
		searchbb.or(QUser.user.firstName.containsIgnoreCase(searchValue));
		searchbb.or(QUser.user.lastName.containsIgnoreCase(searchValue));
		searchbb.or(QUser.user.userName.containsIgnoreCase(searchValue));
	}

	@Override
	public UserDto saveDto(UserDto dto, School school) {
		User entity = toEntity(dto);
		if (!StringUtils.isBlank(entity.getId()) && StringUtils.isBlank(entity.getPassword())) {
			entity = super.findById(entity.getId());
			entity.setPassword(entity.getPassword());
		} else {
			entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		}
		if (StringUtils.isBlank(entity.getId())) {
			String id = sequenceGeneratorService.nextSeq(User.SEQUENCE_NAME);
			entity.setId(id);
		}
		return super.save(entity, school);
	}

	public User findByUserName(String userName) {
		return ((UserMongoRepository) repo).findByUserName(userName);
	}

	public UserDto findByUserNameDto(String userName) {
		return toDto(((UserMongoRepository) repo).findByUserName(userName));
	}
}
