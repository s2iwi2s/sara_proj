package com.sara;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sara.data.repository.AddressMongoRepository;
import com.sara.data.repository.CodeGroupsMongoRepository;
import com.sara.data.repository.EndUserMongoRepository;

@SpringBootTest
class SaraDataApplicationTest {

	@Autowired
	private AddressMongoRepository addressMongoRepository;

	@Autowired
	private CodeGroupsMongoRepository codeGroupsMongoRepository;
	@Autowired
	private EndUserMongoRepository endUserMongoRepository;

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
		assertNotNull(endUserMongoRepository);
	}

}
