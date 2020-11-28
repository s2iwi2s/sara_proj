package com.sara.data.repository;

import java.util.List;

import com.sara.data.document.AccountPayablesSettings;
import com.sara.data.document.School;

public interface AccountPayablesSettingsMongoRepository extends CustomRepository<AccountPayablesSettings, String> {
	List<AccountPayablesSettings> findByActiveAndApplyToAllAndSchool(boolean active, boolean applyToAll, School school);
	
}
