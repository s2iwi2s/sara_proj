package com.sara.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.Address;
import com.sara.data.document.Student;
import com.sara.data.document.User;
import com.sara.service.impl.AddressServiceImpl;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.StudentServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.beans.ResponseStatus;
import com.sara.web.common.Constants;
import com.sara.web.common.Response;
import com.sara.web.common.UserUtil;
import com.sara.web.controller.address.AddressListService;
import com.sara.web.controller.address.AddressResponse;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + AddressController.URL_BASE)
public class AddressController extends AbstractCrudController<Address, String> {

	private static final Logger log = LoggerFactory.getLogger(AddressController.class);

	public static final String URL_BASE = "/address";
	public static final String URL_ADDRESS_SEARCH = "/by/{refId}";
	public static final String URL_ADDRESS_BY_REFID = "/byRefId/{typeId}/{refId}";// user/student/parent
	
	private AddressServiceImpl addressService;
	private StudentServiceImpl studentService;

	public AddressController(UserServiceImpl userServiceImpl, CodeGroupsServiceImpl codeGroupsServiceImpl,
			AddressServiceImpl addressService, StudentServiceImpl studentService) {
		super(userServiceImpl, codeGroupsServiceImpl);
		this.addressService = addressService;
		this.studentService = studentService;
	}

	@Override
	public AddressServiceImpl getService() {
		return addressService;
	}

	@Override
	public AddressResponse getResponse(User user) {
		return new AddressResponse(new AddressListService(addressService));
	}

	@GetMapping(URL_ADDRESS_BY_REFID)
	public Response<Address> addressByRefId(@PathVariable("refId") String refId,
			@PathVariable("typeId") String typeId) {
		Address address = null;

		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		Response<Address> res = getResponse(user);
		ResponseStatus status = new ResponseStatus();
		res.setResponseStatus(status);
		try {
			address = new Address();
			log.info("{}, {}", Constants.ADDRESS_SEARCH_TYPE.USER.getAddressType(), Constants.ADDRESS_SEARCH_TYPE.USER);
			if (Constants.ADDRESS_SEARCH_TYPE.USER.getAddressType().equalsIgnoreCase(typeId)) {
				User usertemp = userServiceImpl.findById(refId);
				address.setUser(usertemp);
			} else if (Constants.ADDRESS_SEARCH_TYPE.STUDENT.getAddressType().equalsIgnoreCase(typeId)) {
				Student student = studentService.findById(refId);
				address.setStudent(student);
			}

			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			e.printStackTrace();

			status.setException(e);
		}

		res.setEntity(address);
		return res;
	}

	@GetMapping(URL_ADDRESS_SEARCH)
	public AddressResponse addressSearch(@PathVariable("refId") String refId,
			@PathVariable(name = "searchValue") String searchValue) {

		User user = UserUtil.getAuthenticatedUser(userServiceImpl);
		AddressResponse res = getResponse(user);
		ResponseStatus status = new ResponseStatus();
		res.setResponseStatus(status);
		res.setSearchValue(searchValue);

		Iterable<Address> list = null;
		try {
			list = addressService.findByRefId(refId, searchValue);
			status.setMessage("SUCCESS!");
		} catch (Exception e) {
			e.printStackTrace();
			status.setException(e);
		}
		res.setList(list);
		return res;
	}
}
