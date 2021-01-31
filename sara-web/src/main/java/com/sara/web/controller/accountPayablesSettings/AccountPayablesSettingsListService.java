package com.sara.web.controller.accountPayablesSettings;

import java.util.List;

import com.sara.data.document.School;
import com.sara.service.dtos.CodeGroupsDto;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountPayablesSettingsListService implements ListService {

	private List<CodeGroupsDto> paymentPeriodList = null;
	private List<CodeGroupsDto> periodList = null;

	public AccountPayablesSettingsListService(CodeGroupsServiceImpl codeGroupsServiceImpl, School school) {
		paymentPeriodList = codeGroupsServiceImpl.findByCodeList("PAYMENT_PERIOD", school);
		periodList = codeGroupsServiceImpl.findByCodeList("PERIOD", school);
	}
}
