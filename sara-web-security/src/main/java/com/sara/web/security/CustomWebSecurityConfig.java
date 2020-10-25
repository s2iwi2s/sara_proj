package com.sara.web.security;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.sara.data.document.AuthorizedUrl;
import com.sara.data.repository.AuthorizedUrlMongoRepository;
import com.sara.web.security.jwt.JwtTokenAuthorizationOncePerRequestFilter;
import com.sara.web.security.jwt.JwtUnAuthorizedResponseAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class CustomWebSecurityConfig extends WebSecurityConfigurerAdapter {
//	private Logger log = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	@Autowired
	private AuthorizedUrlMongoRepository repo;

	@Autowired
	private JwtUnAuthorizedResponseAuthenticationEntryPoint jwtUnAuthorizedResponseAuthenticationEntryPoint;

	@Autowired
	private UserDetailsService jwtUserDetailsService;

	@Autowired
	private JwtTokenAuthorizationOncePerRequestFilter jwtAuthenticationTokenFilter;

	@Value("${jwt.get.token.uri}")
	private String authenticationPath;

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry auth = httpSecurity.csrf()
				.disable().exceptionHandling().authenticationEntryPoint(jwtUnAuthorizedResponseAuthenticationEntryPoint)
				// and sessionManagement
				.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				// authorizeRequests
				.and().authorizeRequests();
//		List<AuthorizedUrl> authorizedUrlsTemp = repo.findAll();
//		log.debug("0 authorizedUrlsTemp => {}", authorizedUrlsTemp); 
		List<AuthorizedUrl> authorizedUrls = repo.findByPermit(false);
		
//		log.debug("\n\n\n\nauthorizedUrls#####################################");
		for (AuthorizedUrl au : authorizedUrls) {
			List<String> newList = au.getAuthorizedUrlRoles().stream().map(r -> {
				String roleName = r.getName();
//				log.debug("1 authorizedUrls=> {}, {}",au.getUrl(), roleName); 
				try {
					roleName = roleName.substring(5);
				} catch (Exception e) {
					e.printStackTrace();
				}
//				log.debug("authorizedUrls=> {}, {}",au.getUrl(), roleName); 
				return roleName;
			}).collect(Collectors.toList());
			newList.add("SUPER_ADMIN");
			//log.debug("authorizedUrls=> {}, {}",au.getUrl(), au.getMethod()); 
			auth.antMatchers(HttpMethod.resolve(au.getMethod()), au.getUrl()).hasAnyRole(newList.stream().toArray(String[]::new));
		}
//		log.debug("authorizedUrls#####################################\n\n\n\n");

		auth.antMatchers("/", "/static/**", "/403","/ui/**", "/actuator/**").permitAll().anyRequest().authenticated();

		httpSecurity.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

//		httpSecurity.headers().frameOptions().sameOrigin() // H2 Console Needs this setting
//				.cacheControl(); // disable caching
	}

	@Override
	public void configure(final WebSecurity webSecurity) throws Exception {
		List<AuthorizedUrl> ignoredUrlList = repo.findByPermit(true);
//		log.debug("ignoredUrls#####################################"); 
		// String[] ignoredUrls =
		// ignoredUrlList.stream().map(AuthorizedUrl::getUrl).toArray(String[]::new);
		String[] ignoredUrls = ignoredUrlList.stream().map(au->{
//			log.debug("ignoredUrls=> {}", au.getUrl());
			return au.getUrl();
		}).toArray(String[]::new);

//		log.debug("ignoredUrls#####################################");
		webSecurity.ignoring().antMatchers(HttpMethod.POST, authenticationPath).antMatchers(HttpMethod.OPTIONS, "/**")
				.and().ignoring().antMatchers(HttpMethod.GET, "/")
				// Other Stuff You want to Ignore
				.and().ignoring().antMatchers(ignoredUrls);
//				.and().ignoring().antMatchers("/", "*", "/login", "/logout", "/favicon.ico", "/css/**", "/static/**",
//						"/js/**", "/*.js", "/*.css", "styles.*.css", "/api/home/**",
//						"", "/actuator/**");

//            .ignoring()
//            .antMatchers("/h2-console/**/**");//Should not be in Production!
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(jwtUserDetailsService).passwordEncoder(bcryptEncoder);
	}
}
