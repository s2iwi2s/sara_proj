package com.sara.data;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.javafaker.Faker;

@Configuration
public class SaraDataConfig {
	@Bean
	public Faker faker() {
		return new Faker();
	}
}
