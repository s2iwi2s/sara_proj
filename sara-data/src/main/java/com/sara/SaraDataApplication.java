package com.sara;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories("com.sara.data.repository")
public class SaraDataApplication {

	public static void main(String[] args) {
		SpringApplication.run(SaraDataApplication.class, args);
	}

}
