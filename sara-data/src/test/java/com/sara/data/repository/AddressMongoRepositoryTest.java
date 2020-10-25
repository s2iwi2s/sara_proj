package com.sara.data.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import com.github.javafaker.Faker;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.sara.data.document.Address;
import com.sara.data.document.QAddress;

@SpringBootTest
class AddressMongoRepositoryTest {
	Logger log = LoggerFactory.getLogger(AddressMongoRepositoryTest.class);
	@Autowired
	private AddressMongoRepository addressMongoRepository;

	@Autowired
	private Faker faker;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {

	}

	private String entityId;

	@BeforeEach
	void setUp() throws Exception {
		assertNotNull(addressMongoRepository, "AddressMongoRepository should not be null");
		addressMongoRepository.deleteAll();
		Address entity = new Address(faker.address());
		entity = addressMongoRepository.save(entity);
		entityId = entity.getId();
		log.info("SETUP entity.getId = {}", entityId);
		log.info("SETUP entity = {}", entity);
	}

	@Test
	void testSave() {
		assertNotNull(addressMongoRepository, "AddressMongoRepository should not be null");
		Address entity = new Address(faker.address());
		entity = addressMongoRepository.save(entity);
		assertNotNull(entity.getId());
	}

	@Test
	void testList() {
		List<Address> list = addressMongoRepository.findAll();
		assertTrue(list.size() > 0, "Unable to get address list");
	}

	@Test
	void testUpdate() {
		Optional<Address> entityOptional = addressMongoRepository.findById(entityId);
		Address entity = entityOptional.get();
		String changes = "updated";
		entity.setAddress1(changes);
		addressMongoRepository.save(entity);

		entityOptional = addressMongoRepository.findById(entityId);
		entity = entityOptional.get();
		assertEquals(changes, entity.getAddress1(), "Unable to update address1");
	}

	@Test
	void testDelete() {
		Optional<Address> entityOptional = addressMongoRepository.findById(entityId);
		addressMongoRepository.deleteById(entityId);
		entityOptional = addressMongoRepository.findById(entityId);
		assertFalse(entityOptional.isPresent());
	}

	@Test
	void testQAddress() {
		Optional<Address> entityOptional = addressMongoRepository.findById(entityId);
		Address entity = entityOptional.get();

		String searchValue = entity.getCity();
		log.info("searchValue = {}", searchValue);

		BooleanBuilder booleanBuilder = new BooleanBuilder();
		booleanBuilder.or(QAddress.address.city.containsIgnoreCase(searchValue));
		Predicate predicate = booleanBuilder.getValue();
		Iterable<Address> findAll = addressMongoRepository.findAll(predicate, Sort.by(Direction.ASC, "name"));

		log.info("testQAddress = {}", findAll);

		try {
			findAll.forEach(a -> {
				log.info("testQAddress findAll.forEach a.name= {}", a.getName());
				assertEquals(a.getName(), entity.getName());
			});
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
