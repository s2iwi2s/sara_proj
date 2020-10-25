package com.sara.service.impl;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@EnableAutoConfiguration
@EntityScan(basePackages = "com.sara.data.document")
class AddressServiceImplTest {
	Logger log = LoggerFactory.getLogger(AddressServiceImplTest.class);
	@Autowired
	private AddressServiceImpl addressServiceImpl;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Test
	void test() {
		log.debug("addressServiceImpl=>" + addressServiceImpl);
		assertNotNull(addressServiceImpl);
	}
}
