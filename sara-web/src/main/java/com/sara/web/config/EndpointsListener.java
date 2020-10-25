package com.sara.web.config;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

//@Component
public class EndpointsListener implements ApplicationListener<ContextRefreshedEvent> {
	private Logger log = LoggerFactory.getLogger(this.getClass());

//	private RoleRepository roleRepository;
//	private AuthorizedUrlCrudRepository authorizedUrlCrudRepository;
//
//	@Autowired
//	public EndpointsListener(AuthorizedUrlCrudRepository authorizedUrlCrudRepository, RoleRepository roleRepository) {
//		this.authorizedUrlCrudRepository = authorizedUrlCrudRepository;
//		this.roleRepository = roleRepository;
//	}

	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		ApplicationContext applicationContext = event.getApplicationContext();
		applicationContext.getBean(RequestMappingHandlerMapping.class).getHandlerMethods().forEach((info, methods) -> {
			// log.debug("**** info ****");

			log.debug("**** info => {}", info);

			log.debug("info => name={}, PatternsCondition={}, MethodsCondition={}", info.getName(),
					info.getPatternsCondition(), info.getMethodsCondition());
//			log.debug("**** methods ****");
			log.debug("**** methods => {}", methods);

//			log.debug("info => PatternsCondition={}, MethodsCondition={}", info.getPatternsCondition(),
//					info.getMethodsCondition());

			final List<String> urlPattern = Arrays.asList("", "");
			info.getMethodsCondition().getMethods().forEach(m -> {
				urlPattern.set(1, m.name());
			});

			Set<String> patterns = info.getPatternsCondition().getPatterns();
			patterns.forEach(url -> {
				urlPattern.set(0, url);
			});

			log.debug("urlPattern => {}", urlPattern);
			String url = urlPattern.get(0);
			log.debug("1. url => {}", url);
			if (url.indexOf("{") != -1) {
				boolean isId = url.indexOf("/{id}") != -1;
				url = url.substring(0, url.indexOf("/{"));
				if (!isId) {
					url = url + "/**";
				}
			}
			log.debug("2. url => {}", url);

//			String method = urlPattern.get(1);
//			if (!StringUtils.isEmpty(url) && !StringUtils.isEmpty(method) && url.indexOf("/api") != -1) {
//				String className = methods.getBeanType().getSimpleName();
//				className = className.replaceAll("Controller", "");
//				String methodName = methods.getMethod().getName();
//				
//				String roleName = "ROLE_" + className + "::" + methodName;
////				log.debug("\t-roleName  => {}", roleName);
//				roleName = roleName.toUpperCase();
//				Role role = new Role(roleName);
//				roleRepository.save(role);
//				
//				AuthorizedUrl authorizedUrl = null;
//				authorizedUrl = new AuthorizedUrl(null, url, false, role);
//				authorizedUrl = authorizedUrlCrudRepository.save(authorizedUrl);
//			}
		});

	}

}
