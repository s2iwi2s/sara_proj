package com.sara.data.repository;

import java.util.List;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.GradeLevelPayables;

public interface GradeLevelPayablesMongoRepository extends CustomRepository<GradeLevelPayables, String> {
	List<GradeLevelPayables> findByLevelAndActive(CodeGroups level, boolean active);
}
