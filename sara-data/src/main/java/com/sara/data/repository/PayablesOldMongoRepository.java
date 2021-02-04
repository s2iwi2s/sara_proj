package com.sara.data.repository;

import java.util.List;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.PayablesOld;
import com.sara.data.document.School;

public interface PayablesOldMongoRepository
		extends CustomRepository<PayablesOld, String> {

	List<PayablesOld> findByStudentSchoolAndPeriodAndStatusCode(School school, CodeGroups period, String status);
}
