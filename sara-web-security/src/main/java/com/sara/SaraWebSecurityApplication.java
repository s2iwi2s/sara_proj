package com.sara;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SaraWebSecurityApplication implements CommandLineRunner {

//	private static final Logger log = LoggerFactory.getLogger(SaraWebSecurityApplication.class);

//	@Autowired
//	private ApplicationContext appContext;

	public static void main(String[] args) {
		SpringApplication.run(SaraWebSecurityApplication.class, args);
	}
//	@Bean
//	public String profilesActive(@Value("${profiles.active}") String profilesActive) {
//		log.info("\n\n\n" + "***************************************************\n"
//				+ "** @SpringBootApplication PROFILESACTIVE ==>>" + profilesActive + "\n"
//				+ "***************************************************\n\n\n");
//		return profilesActive;
//	}
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
