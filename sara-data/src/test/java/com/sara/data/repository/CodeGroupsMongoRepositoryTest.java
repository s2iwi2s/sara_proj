package com.sara.data.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.github.javafaker.Faker;
import com.sara.data.document.CodeGroups;

@SpringBootTest
class CodeGroupsMongoRepositoryTest {

	@Autowired
	private CodeGroupsMongoRepository codeGroupsMongoRepositoryTest;

	@Autowired
	private Faker faker;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
		CodeGroups c = new CodeGroups(faker);
		codeGroupsMongoRepositoryTest.save(c);
	}

	@Test
	void testList() {
		List<CodeGroups> codeGruopsList = codeGroupsMongoRepositoryTest.findByCodeOrderByPriority("STATUS");
		assertTrue(codeGruopsList.size() > 0);
	}

}
