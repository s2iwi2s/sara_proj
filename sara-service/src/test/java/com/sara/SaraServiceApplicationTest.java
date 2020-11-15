package com.sara;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

import com.sara.service.impl.AddressServiceImpl;

@SpringBootTest
@EnableAutoConfiguration
class SaraServiceApplicationTest {
	
	@Autowired
	private AddressServiceImpl addressServiceImpl;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@Test
	void contextLoads() {
		// fail("Not yet implemented");
		
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Test
	void test() {
		assertNotNull(addressServiceImpl);
	}
}
