package com.example.MEEPS;

import com.example.MEEPS.service.HealthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MeepsApplication implements CommandLineRunner {

    private final HealthService healthService;

    @Autowired
    public MeepsApplication(HealthService healthService) {
        this.healthService = healthService;
    }

    public static void main(String[] args) {
        SpringApplication.run(MeepsApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
//			String response = healthService.determineRiskFactors("[Pollen allergy, Cardiovascular Disease]");
//			System.out.println("ChatGPT response: " + response);
    }
}