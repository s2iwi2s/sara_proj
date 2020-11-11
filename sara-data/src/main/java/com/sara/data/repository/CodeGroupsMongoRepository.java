package com.sara.data.repository;

import java.util.List;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.School;

public interface CodeGroupsMongoRepository extends CustomRepository<CodeGroups, String> {
//		extends SaraRepositoryInterface<CodeGroups, String>, MongoRepository<CodeGroups, String>,
//		QuerydslPredicateExecutor<CodeGroups>, QuerydslBinderCustomizer<QCodeGroups> {
//	@Query(Constants.CODE_GROUPS_QUERY)
	public List<CodeGroups> findByCodeAndSchoolOrderByPriority(String code, School org);

	public CodeGroups findByCodeAndSchool(String code, School org);

//	@Override
	// for QuerydslBinderCustomizer
//	default public void customize(QuerydslBindings bindings, QCodeGroups root) {
//		bindings.bind(String.class).first((StringPath path, String value) -> path.like(value));
//	}
}
