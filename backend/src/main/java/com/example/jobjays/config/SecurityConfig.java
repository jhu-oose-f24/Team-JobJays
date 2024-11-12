package com.example.jobjays.config;

import com.example.jobjays.auth.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests((authorize) -> authorize
            // Open endpoints for unauthenticated access
            .requestMatchers( new AntPathRequestMatcher("/api/users/**")).permitAll()
            .requestMatchers( new AntPathRequestMatcher("/api/applicants/**")).permitAll()
            // Secure all other endpoints
            .anyRequest().authenticated()
        ).csrf(AbstractHttpConfigurer::disable);
        //.addFilter(new JwtAuthenticationFilter(), AuthorizationFilter.class); // or .formLogin() as per your needs
    return http.build();
  }
}
