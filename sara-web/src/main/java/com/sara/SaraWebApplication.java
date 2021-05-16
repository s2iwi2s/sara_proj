package com.sara;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@PropertySource(value = { "classpath:application.properties", "classpath:mongodb.properties",
		"classpath:jwt.properties", "classpath:logger.properties" })
@SpringBootApplication
@EnableMongoAuditing
public class SaraWebApplication implements CommandLineRunner {

	private static final Logger log = LoggerFactory.getLogger(SaraWebApplication.class);

//	@Autowired
//	private ApplicationContext appContext;
	@Autowired
	private Environment environment;

	public static void main(String[] args) {
		SpringApplication.run(SaraWebApplication.class, args);

//		System.setProperty("spring.profiles.active", "dev")

//		new SpringApplicationBuilder()
//        .profiles("dev") // and so does this
//        .sources(SaraWebApplication.class)
//        .run(args);

	}

	@Bean
	public String currentInfo(@Value("${logo.location}") String logoLocation, @Value("${spring.data.mongodb.uri}") String mongodb,
			@Value("${jwt.token.expiration.in.seconds}") String jwtExpiration,
							  @Value("${jwt.signing.key.secret}") String jwtSecret) {

		Map<String, String> params = new HashMap<>();
		params.put("logo.location", logoLocation);
		params.put("spring.data.mongodb.uri", mongodb);
		params.put("jwt.token.expiration.in.seconds", jwtExpiration);
		params.put("jwt.signing.key.secret", jwtSecret);


		StringBuilder sb = new StringBuilder();
		for (String profileName : environment.getActiveProfiles()) {
			if (sb.length() > 0) {
				sb.append(", ");
			}
			sb.append(profileName);
		}
		params.put("activeProfile", sb.toString());
		System.out.println("Currently active profile - " + sb);

		String jsonParams = "{}";
		try {
			ObjectMapper jsonObjMap = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
			jsonParams = jsonObjMap.writeValueAsString(params);
		} catch (JsonProcessingException e) {
			// e.printStackTrace();
		}

		log.info("\n\n\n" + "***************************************************\n" + jsonParams
				+ "\n***************************************************\n\n");
		return jsonParams;
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
