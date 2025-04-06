package com.example.MEEPS;

import com.example.MEEPS.service.healthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MeepsApplication implements CommandLineRunner {

    private final healthService healthService;

    @Autowired
    public MeepsApplication(healthService healthService) {
        this.healthService = healthService;
    }

    public static void main(String[] args) {
        SpringApplication.run(MeepsApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
			String response = healthService.determineRiskFactors("[Pollen allergy, Cardiovascular Disease]");
			System.out.println("ChatGPT response: " + response);
    }
}