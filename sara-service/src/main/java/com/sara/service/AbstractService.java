package com.sara.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.data.repository.CustomRepository;

/**
 * 
 * @author WPidor
 *
 * @since 10/05/2020
 */

public abstract class AbstractService<T, D, ID> implements ServiceInterface<T, D, ID> {
	protected CustomRepository<T, ID> repo;

	protected SequenceGeneratorService sequenceGeneratorService;

	public AbstractService(CustomRepository<T, ID> repo, SequenceGeneratorService sequenceGeneratorService) {
		this.repo = repo;
		this.sequenceGeneratorService = sequenceGeneratorService;
	}

	public Page<T> findAll(Pageable pageable) {
		return repo.findAll(pageable);
	}

	public List<T> findAll() {
		return repo.findAll();
	}

	@Override
	public Page<D> findAll(String searchValue, Pageable pageable, User user) {
		BooleanBuilder searchbb = new BooleanBuilder();
		findAllQBuilder(searchValue, searchbb, user);

		Predicate predicate = findAllPredicate(user, searchbb);

		// return repo.findAll(predicate, pageable);
		return toDto(repo.findAll(predicate, pageable));
	}

	public Predicate findAllPredicate(User user, BooleanBuilder searchbb) {
		BooleanBuilder mainbb = new BooleanBuilder();
		BooleanExpression bex = getFindAllBooleanExpression(user);
		mainbb.and(bex);
		mainbb.and(searchbb);
		Predicate predicate = mainbb.getValue();
		return predicate;
	}

	@Override
	public void deleteById(ID id) {
		repo.deleteById(id);
	}

	@Override
	public D findByIdDto(ID id) {
		return toDto(findById(id));
	}
	@Override
	public T findById(ID id) throws IllegalArgumentException {
		if (id != null && "-1".equals(id)) {
			return null;
		}

//		if (id == null) {
//			throw new IllegalArgumentException("No Data Found");
//		}

		Optional<T> oEntity = repo.findById(id);
		if (!oEntity.isPresent()) {
			throw new IllegalArgumentException(String.format("_id: ObjectId(\"%s\") Not Found!", id));
		}
		return oEntity.get();
	}

	public T save(T entity) {
		return repo.save(entity);
	}

	@Override
	public D save(T entity, School school) {
		return toDto(repo.save(entity));
	}
}
