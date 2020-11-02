package com.sara;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.github.javafaker.Faker;
import com.sara.data.document.Role;
import com.sara.data.document.School;
import com.sara.data.document.User;
import com.sara.data.repository.RoleMongoRepository;
import com.sara.data.repository.SchoolMongoRepository;
import com.sara.data.repository.UserMongoRepository;

@Component
public class DataLoader implements ApplicationListener<ContextRefreshedEvent> {
	private final Logger log = LoggerFactory.getLogger(this.getClass());


	@Autowired
	private final Faker faker = new Faker();
	
	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	@Autowired
	private SchoolMongoRepository schoolMongoRepository;
	
	@Autowired
	private UserMongoRepository userMongoRepository;
	
	@Autowired
	private RoleMongoRepository roleMongoRepository;

	public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {

		log.debug("DataLoader.load - START");
//		init();
//		initUsers();
		log.debug("DataLoader.load - END");

	}

	private void init() {
//		schoolMongoRepository.deleteAll();
		userMongoRepository.deleteAll();
	}
	
	private School initSchool() {
		School school = new School(null, "ST. LORENZO RUIZ ACADEMY OF TAGUM, INC."
				, "2020-2021", "stlorenzoruiz", "Tagum City, Davao del Norte");
		
		school = schoolMongoRepository.save(school);
		
		return school;
	}
	private void initUsers() {
		School school = null;
		Optional<School> schoolOptional = schoolMongoRepository.findById("5f9c52b3ef7618233e66f80e");
		if(schoolOptional.isPresent()) {
			school = schoolOptional.get();
		}
		
		List<Role> roles = new ArrayList<Role>();
		Optional<Role> adminRoleOptional = roleMongoRepository.findById("5f8dbd30d266c45504e620d6");
		
		if(adminRoleOptional.isPresent()) {
			Role role = adminRoleOptional.get();
			roles = Arrays.asList(role);
		}
		User user1 = new User(null, "wpidor", bcryptEncoder.encode("test"), "Pidor", "Winston", roles, school);
		User user2 = new User(null, "test", bcryptEncoder.encode("test"), "test", "test", roles, school);
//		userMongoRepository.save(user1);
//		userMongoRepository.save(user2);
		userMongoRepository.saveAll(Arrays.asList(user1, user2));
	}


	private void toJson(Object obj) {
		try {
			ObjectMapper jsonObjMap = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
			String json = jsonObjMap.writeValueAsString(obj);
			log.debug("jInfo:\n" + json);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}
}
