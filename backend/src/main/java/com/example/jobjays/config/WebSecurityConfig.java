package com.example.jobjays.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig implements WebMvcConfigurer {



  @Bean
  public PasswordEncoder passwordEncoder () {
    return new BCryptPasswordEncoder(10);
  }
//  @Bean
//  public InMemoryUserDetailsManager userDetailsService() {
//    UserDetails user = User.withUsername("user1").password(passwordEncoder().encode("userPass1"))
//        .roles("USER")
//        .build();
//    return new InMemoryUserDetailsManager(user);
//  }

//  @Bean
//  public UserDetailsService userDetailsService() {
//    InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
//    manager.createUser(User.withDefaultPasswordEncoder().username("user").password("password").roles("USER").build());
//    return manager;
//  }
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
        .allowedOrigins("http://localhost:3000")  // Your frontend origin
        .allowedOrigins("https://jobjays.vercel.app")  // Your frontend origin
        .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allowed HTTP methods
        .allowedHeaders("*")  // Allowed headers
        .allowCredentials(true);  // Allow cookies or authentication headers
  }

}

