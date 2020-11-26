package com.sara.web.controller.gradeLevelPayables;

import java.util.ArrayList;

import com.sara.data.document.Address;
import com.sara.data.document.GradeLevelPayables;
import com.sara.web.common.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GradeLevelPayablesResponse extends Response<GradeLevelPayables> {
	private static final long serialVersionUID = -1164423995409192025L;
	Iterable<Address> list = new ArrayList<Address>();

	public GradeLevelPayablesResponse(GradeLevelPayablesListService gradeLevelPayablesListService) {
		super(gradeLevelPayablesListService);
	}
}
