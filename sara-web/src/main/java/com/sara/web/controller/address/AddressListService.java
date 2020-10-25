package com.sara.web.controller.address;

import java.util.List;

import com.sara.data.document.Address;
import com.sara.data.document.CodeGroups;
import com.sara.service.impl.AddressServiceImpl;
import com.sara.web.common.ListService;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressListService implements ListService<Address> {

	private List<CodeGroups> statusList = null;

	public AddressListService(AddressServiceImpl addressListService) {
		// statusList = codeGroupsService.findByCode("STATUS");
	}
}
