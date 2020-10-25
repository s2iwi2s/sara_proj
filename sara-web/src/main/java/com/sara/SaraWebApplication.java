package com.sara;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SaraWebApplication implements CommandLineRunner {

	private static final Logger log = LoggerFactory.getLogger(SaraWebApplication.class);

	@Autowired
	private ApplicationContext appContext;

	public static void main(String[] args) {
		SpringApplication.run(SaraWebApplication.class, args);
	}
	@Bean
	public String profilesActive(@Value("${profiles.active}") String profilesActive) {
		log.info("\n\n\n" + "***************************************************\n"
				+ "** @SpringBootApplication PROFILESACTIVE ==>>" + profilesActive + "\n"
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
