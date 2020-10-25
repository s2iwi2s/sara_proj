package com.sara.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.Address;
import com.sara.data.document.EndUser;
import com.sara.service.impl.AddressServiceImpl;
import com.sara.service.impl.EndUserServiceImpl;
import com.sara.web.beans.ResponseStatus;
import com.sara.web.common.Constants;
import com.sara.web.common.Constants.ADDRESS_SEARCH_TYPE;
import com.sara.web.controller.address.AddressListService;
import com.sara.web.controller.address.AddressResponse;
import com.sara.web.common.Response;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + AddressController.URL_BASE)
public class AddressController extends AbstractCrudController<Address, String> {
	public static final String URL_BASE = "/address";
	public static final String URL_ADDRESS_BYENDUSER = "/endUser/{endUserId}";
	public static final String URL_ADDRESS_SEARCH = "/by/{searchType}/{id}";

	public AddressController() {
	}

	@Autowired
	private AddressServiceImpl addressService;

	@Autowired
	private EndUserServiceImpl endUserService;

//	@Autowired
//	private CodeGroupsServiceImpl codeGroupsService;

	@Override
	public AddressServiceImpl getService() {
		return addressService;
	}

	@Override
	public AddressResponse getResponse() {
		return new AddressResponse(new AddressListService(addressService));
	}

	@GetMapping(URL_ADDRESS_BYENDUSER)
	public Response<Address> addressByEndUser(@PathVariable("endUserId") String endUserId) {
		Address address = null;
		Response<Address> res = getResponse();
		ResponseStatus status = new ResponseStatus();
		res.setResponseStatus(status);
		try {
			address = new Address();
			EndUser endUser = endUserService.findById(endUserId);
			address.setEndUser(endUser);
			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			e.printStackTrace();

			status.setException(e);
		}

		res.setEntity(address);
		return res;
	}

	@GetMapping(URL_ADDRESS_SEARCH)
	public AddressResponse addressSearch(@PathVariable(name = "searchType") String searchType,
			@PathVariable("id") String id, @RequestParam("searchValue") String searchValue) {

		AddressResponse res = getResponse();
		ResponseStatus status = new ResponseStatus();
		res.setResponseStatus(status);
		res.setSearchValue(searchValue);

		Iterable<Address> list = null;
		try {
			if (ADDRESS_SEARCH_TYPE.END_USER.toString().equalsIgnoreCase(searchType)) {
				System.out.println("ADDRESS_SEARCH_TYPE=" + ADDRESS_SEARCH_TYPE.END_USER);
				list = addressService.findByEndUser(id, searchValue);
			}
			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setException(e);
		}
		res.setList(list);
		return res;
	}
}
