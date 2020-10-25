package com.sara.web.controller.address;

import java.util.ArrayList;

import com.sara.data.document.Address;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressResponse extends Response<Address> {
	private static final long serialVersionUID = -1164423995409192025L;
	Iterable<Address> list = new ArrayList<Address>();

	public AddressResponse(AddressListService addresssListService) {
		super(addresssListService);
	}
}
