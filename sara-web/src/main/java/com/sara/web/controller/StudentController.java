package com.sara.web.controller;

import org.springframework.context.annotation.Primary;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sara.data.document.Student;
import com.sara.data.document.User;
import com.sara.service.impl.CodeGroupsServiceImpl;
import com.sara.service.impl.StudentServiceImpl;
import com.sara.service.impl.UserServiceImpl;
import com.sara.web.common.Constants;
import com.sara.web.controller.student.StudentListService;
import com.sara.web.controller.student.StudentResponse;

@RestController
@Primary
@RequestMapping(path = Constants.URL_API_BASE + StudentController.URL_BASE)
public class StudentController extends AbstractCrudController<Student, String> {

//	private static final Logger log = LoggerFactory.getLogger(StudentController.class);

	public static final String URL_BASE = "/student";

	private StudentServiceImpl studentServiceImpl;

	public StudentController(UserServiceImpl userServiceImpl, CodeGroupsServiceImpl codeGroupsServiceImpl,
			StudentServiceImpl studentServiceImpl) {
		super(userServiceImpl, codeGroupsServiceImpl);
		this.studentServiceImpl = studentServiceImpl;
	}

	@Override
	public StudentServiceImpl getService() {
		return studentServiceImpl;
	}

	@Override
	public StudentResponse getResponse(User user) {
		return new StudentResponse(new StudentListService(user.getSchool(), codeGroupsServiceImpl));
	}
}
