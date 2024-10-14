package com.example.jobjays.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
        .allowedOrigins("http://localhost:3000")  // Your frontend origin
        .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allowed HTTP methods
        .allowedHeaders("*")  // Allowed headers
        .allowCredentials(true);  // Allow cookies or authentication headers
  }
}

