package com.sara.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.Address;
import com.sara.data.document.Student;
import com.sara.data.document.User;
import com.sara.service.impl.AddressServiceImpl;
import com.sara.service.impl.StudentServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.beans.ResponseStatus;
import com.sara.web.common.Constants;
import com.sara.web.common.Constants.ADDRESS_SEARCH_TYPE;
import com.sara.web.controller.address.AddressListService;
import com.sara.web.controller.address.AddressResponse;
import com.sara.web.common.Response;

@RestController
@RequestMapping(path = Constants.URL_API_BASE + AddressController.URL_BASE)
public class AddressController extends AbstractCrudController<Address, String> {

	private static final Logger log = LoggerFactory.getLogger(AddressController.class);

	public static final String URL_BASE = "/address";
	public static final String URL_ADDRESS_SEARCH = "/by/{refId}";
	public static final String URL_ADDRESS_BY_REFID = "/byRefId/{typeId}/{refId}";// user/student/parent

	public AddressController() {
	}

	@Autowired
	private AddressServiceImpl addressService;

	@Autowired
	private UserServiceImpl endUserService;

	@Autowired
	private StudentServiceImpl studentService;

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

	@GetMapping(URL_ADDRESS_BY_REFID)
	public Response<Address> addressByRefId(@PathVariable("refId") String refId,
			@PathVariable("typeId") String typeId) {
		Address address = null;
		Response<Address> res = getResponse();
		ResponseStatus status = new ResponseStatus();
		res.setResponseStatus(status);
		try {
			address = new Address();
			log.info("{}, {}", Constants.ADDRESS_SEARCH_TYPE.USER.getAddressType(), Constants.ADDRESS_SEARCH_TYPE.USER);
			if (Constants.ADDRESS_SEARCH_TYPE.USER.getAddressType().equalsIgnoreCase(typeId)) {
				User user = endUserService.findById(refId);
				address.setUser(user);
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

		AddressResponse res = getResponse();
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
