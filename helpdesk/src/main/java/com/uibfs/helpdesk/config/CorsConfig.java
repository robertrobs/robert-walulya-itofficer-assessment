package com.uibfs.helpdesk.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

// created this class to configure CORS (Cross-Origin Resource Sharing) settings for the application. this is important because the frontend
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000") // this is the URL of the frontend application.
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // these are the HTTP methods that will be allowed for cross-origin requests.
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}

