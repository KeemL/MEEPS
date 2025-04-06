package com.example.MEEPS.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

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

    /*
    Determines the user's risk factor's based on their health history.
    */
    @Override
    public String determineRiskFactors(String userInput) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + "replace" /* API KEY GOES HERE */);
        
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("input", userInput);
        requestBody.put("model", "gpt-4o");
        requestBody.put("temperature", 0.5);
        requestBody.put("instructions", """
            Given a set of the user's medical data classify their risk factors into the following categories, and include your response as a json.
            
            Potential Risk Factors:
            - Pollen
            - UV Index
            - Air Pollution
            - Heat

            Example Respones:
            {
                "risk_factors": [ 
                    "Pollen", "Noise Pollution"
                ]
            }
        """);
                
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        
        String url = "https://api.openai.com/v1/responses";
        ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
        
        return response.getBody();
    }
}
