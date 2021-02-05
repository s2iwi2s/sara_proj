package com.sara.data.repository;

import java.util.List;

import com.sara.data.document.AccountPayablesSettings;
import com.sara.data.document.CodeGroups;
import com.sara.data.document.School;

public interface AccountPayablesSettingsMongoRepository extends CustomRepository<AccountPayablesSettings, String> {
	List<AccountPayablesSettings> findByActiveAndApplyToAllAndSchoolAndPeriodOrderByPriority(boolean active,
			boolean applyToAll, School school, CodeGroups period);

	List<AccountPayablesSettings> findByLabelAndSchoolAndPeriod(String label, School school, CodeGroups period);
}
