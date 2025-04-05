package com.example.MEEPS.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class healthServiceImplementation implements healthService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;


    public healthServiceImplementation(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    @Override
    public String checkPatient() {

        return "Patient is good to go.";
    }
}
