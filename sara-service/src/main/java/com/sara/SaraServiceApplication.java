package com.sara;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SaraServiceApplication implements CommandLineRunner {

//	@Autowired
//	private ApplicationContext appContext;

	public static void main(String[] args) {
		SpringApplication.run(SaraServiceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		String[] beans = appContext.getBeanDefinitionNames();
//		Arrays.sort(beans);
//		for (String bean : beans) {
//			System.out.println(bean);
//		}
	}
}
