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

import java.util.HashMap;
import java.util.Map;

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

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-4o");
        requestBody.put("input", userInput);
        requestBody.put("temperature", 0.5);
        requestBody.put("instructions",
                """
                            Given a set of the user's medical data, classify their risk factors into the following categories, and include your response as a json.

                            Potential Risk Factors:
                            - Pollen
                            - UV Index
                            - Air Pollution
                            - Heat

                            Example Response:
                            {
                                "risk_factors": [
                                    "Pollen", "Air Pollution"
                                ]
                            }
                        """);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        // Use the endpoint as shown in your example
        String url = "https://api.openai.com/v1/responses";
        ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode outputArray = root.path("output");
            if (outputArray.isArray() && outputArray.size() > 0) {
                JsonNode firstOutput = outputArray.get(0);
                JsonNode contentArray = firstOutput.path("content");
                if (contentArray.isArray() && contentArray.size() > 0) {
                    String text = contentArray.get(0).path("text").asText();
                    JsonNode parsedContent = objectMapper.readTree(text);
                    System.out.println("JSON: " + parsedContent.toString());
                    return objectMapper.writeValueAsString(parsedContent);
                }
            }
            return "{\"risk_factors\": []}";
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"risk_factors\": []}";
        }
    }

    public String[] getInfo(String[] conditions, String[] environmentalRisks){
        String[] emptyArray = new String[0];
        try{
            String[] informationArray = new String[conditions.length];
            for (int x = 0; x < conditions.length; x++) {
                String promptTemplate = String.format(
                        "I have %s. how is %s Environmental risk factors related to %s? answer in 3 short sentences.",
                        conditions[x], environmentalRisks[x], conditions[x]);
                
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.set("Authorization", "Bearer " + apiKey);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("input", promptTemplate);
            requestBody.put("model", "gpt-4o");
            requestBody.put("temperature", 0.5);
            requestBody.put("instructions", promptTemplate);
            
            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

            String url = "https://api.openai.com/v1/chat/completions";
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
        
            informationArray[x] = response.getBody();
            }
           
            return informationArray;
        }
        catch (Exception e){
            return emptyArray;
        }

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
