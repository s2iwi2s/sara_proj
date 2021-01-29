package com.sara.data.repository;

import java.util.List;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.GradeLevelPayables;

public interface GradeLevelPayablesMongoRepository extends CustomRepository<GradeLevelPayables, String> {
	List<GradeLevelPayables> findByLevelAndActive(CodeGroups level, boolean active);
	List<GradeLevelPayables> findByLevelAndPeriodAndActive(CodeGroups level, CodeGroups period, boolean active);
	List<GradeLevelPayables> findByLevelAndPeriodAndActiveOrderByAccountPayablesSettingsPriority(CodeGroups level, CodeGroups period, boolean active);
}
