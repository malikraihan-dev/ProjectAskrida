package com.askrida.web.service.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class PengaturanAksesSilang {
    
    @Bean
    public WebMvcConfigurer konfigurasiFrontendBackend() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry daftarPemetaan) {
                daftarPemetaan.addMapping("/rest/**")
                    .allowedOriginPatterns("*")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                    .allowedHeaders("Content-Type", "Authorization", "X-Requested-With")
                    .exposedHeaders("Content-Type", "X-Total-Count")
                    .allowCredentials(false)
                    .maxAge(7200);
            }
        };
    }
}
