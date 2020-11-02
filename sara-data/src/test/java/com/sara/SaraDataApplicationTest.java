package com.sara;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sara.data.repository.AddressMongoRepository;
import com.sara.data.repository.AuthorizedUrlMongoRepository;
import com.sara.data.repository.CodeGroupsMongoRepository;
import com.sara.data.repository.UserMongoRepository;
import com.sara.data.repository.RoleMongoRepository;
import com.sara.data.repository.SchoolMongoRepository;
import com.sara.data.repository.StudentMongoRepository;

@SpringBootTest
class SaraDataApplicationTest {

	@Autowired
	private AddressMongoRepository addressMongoRepository;

	@Autowired
	private CodeGroupsMongoRepository codeGroupsMongoRepository;
	
	@Autowired
	private UserMongoRepository userMongoRepository;

	@Autowired
	private AuthorizedUrlMongoRepository authorizedUrlMongoRepository;
	
	@Autowired
	private RoleMongoRepository roleMongoRepository;
	
	@Autowired
	private StudentMongoRepository studentMongoRepository;
	
	@Autowired
	private SchoolMongoRepository schoolMongoRepository;
	

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Test
	void contextLoads() {
		// fail("Not yet implemented");
	}

	@Test
	void test() {
		assertNotNull(addressMongoRepository);
		assertNotNull(codeGroupsMongoRepository);
		assertNotNull(userMongoRepository);
		assertNotNull(authorizedUrlMongoRepository);
		assertNotNull(roleMongoRepository);
		assertNotNull(studentMongoRepository);
		assertNotNull(schoolMongoRepository);
	}

}
