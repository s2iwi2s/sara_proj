package com.sara;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@PropertySource(value = { "classpath:application.properties", "classpath:mongodb.properties",
		"classpath:jwt.properties", "classpath:logger.properties" })
@SpringBootApplication
@EnableMongoAuditing
public class SaraWebApplication implements CommandLineRunner {

	private static final Logger log = LoggerFactory.getLogger(SaraWebApplication.class);

//	@Autowired
//	private ApplicationContext appContext;

	public static void main(String[] args) {
		SpringApplication.run(SaraWebApplication.class, args);
	}

	@Bean
	public String profilesActive(@Value("${profiles.active}") String profilesActive,
			@Value("${logo.location}") String logoLocation, @Value("${spring.data.mongodb.uri}") String mongodb,
			@Value("${jwt.token.expiration.in.seconds}") String jwtExpiration) {
		log.info("\n\n\n" + "***************************************************\n"
				+ "** @SpringBootApplication profiles.active ==>>" + profilesActive + "\n"
				+ "** @SpringBootApplication spring.data.mongodb.uri ==>>" + mongodb + "\n"
				+ "** @SpringBootApplication logo.location ==>>" + logoLocation + "\n"
				+ "** @SpringBootApplication jwt.token.expiration.in.seconds ==>>" + jwtExpiration + "\n"
				+ "***************************************************\n\n\n");
		return profilesActive;
	}

	@Override
	public void run(String... args) throws Exception {
//		log.info("SaraWebApplication - BeanDefinitionNames");
//		String[] beans = appContext.getBeanDefinitionNames();
//		Arrays.sort(beans);
//		for (String bean : beans) {
//			System.out.println(bean);
//		}
	}
}
