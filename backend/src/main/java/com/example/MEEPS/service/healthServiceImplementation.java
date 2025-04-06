package com.example.MEEPS.service;

import com.example.MEEPS.entity.Patient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod; // Ensure this import is present
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class healthServiceImplementation implements HealthService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${openai.api-key}")
    private String apiKey;

    @Value("${meersens.api-key}")
    private String meersensKey;

    public healthServiceImplementation(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    @Override
    public String checkPatient() {
        return "Patient is good to go.";
    }

    @Override
    public String determineRiskFactors(String userInput) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);
        // Build request body (omitted for brevity)
        return "";
    }

    @Override
    public int checkAQI(double latitude, double longitude) {
        try {
            String url = "https://api.meersens.com/environment/public/air/current?lat=" 
                        + latitude + "&lng=" + longitude;
            HttpHeaders headers = new HttpHeaders();
            headers.set("apikey", meersensKey);
            HttpEntity<?> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                JsonNode root = objectMapper.readTree(response.getBody());
                JsonNode indexNode = root.path("index");
                // Return the AQI value as an integer
                return (int) indexNode.path("value").asDouble();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    @Override
    public double checkPollenIndex(double latitude, double longitude) {
        try {
            String url = "https://api.meersens.com/environment/public/pollen/current?lat="
                    + latitude + "&lng=" + longitude;
            HttpHeaders headers = new HttpHeaders();
            headers.set("apikey", meersensKey);
            HttpEntity<?> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                JsonNode root = objectMapper.readTree(response.getBody());
                JsonNode indexNode = root.path("index");
                return indexNode.path("value").asDouble();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    @Override
    public double checkUVIndex(double latitude, double longitude) {
        try {
            String url = "https://api.meersens.com/environment/public/uv/current?lat="
                    + latitude + "&lng=" + longitude;
            HttpHeaders headers = new HttpHeaders();
            headers.set("apikey", meersensKey);
            HttpEntity<?> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                JsonNode root = objectMapper.readTree(response.getBody());
                JsonNode indexNode = root.path("index");
                return indexNode.path("value").asDouble();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    @Override
    public double checkTemperature(double latitude, double longitude) {
        try {
            String url = "https://api.meersens.com/environment/public/weather/current?lat="
                    + latitude + "&lng=" + longitude;
            HttpHeaders headers = new HttpHeaders();
            headers.set("apikey", meersensKey);
            HttpEntity<?> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                JsonNode root = objectMapper.readTree(response.getBody());
                JsonNode parameters = root.path("parameters");
                JsonNode temperatureNode = parameters.path("temperature");
                return temperatureNode.path("value").asDouble();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    @Override
    public JsonNode processPatient(Patient patient) {
        // Example implementation: simply returns the incoming geojson.
        // You can update this method to process risk factors as needed.
        return patient.getGeojson();
    }
}
