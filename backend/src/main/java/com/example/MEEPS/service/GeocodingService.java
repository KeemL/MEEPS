package com.example.MEEPS.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeocodingService {
    String baseURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    String geocodeAPIkey = "AIzaSyDb3Bc5eoP0lmTwsszGs47En56XPD5Z_VQ";
//    String hardURL = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=";
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    String formatted_address;
    List<Double> coordinates;

    public GeocodingService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public List<Double> geocode(String address) {
        String encodedAddress = URLEncoder.encode(address, StandardCharsets.UTF_8);
        String url = baseURL + encodedAddress + "&key=" + geocodeAPIkey;
//        String url = hardURL + geocodeAPIkey;
        HttpHeaders headers = new HttpHeaders();
        Map<String, Object> requestBody = new HashMap<>();

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);


        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String json = response.getBody();

        return extractCoordinates(json);
    }

    public List<Double> extractCoordinates(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(json);

            JsonNode location = root
                    .path("results")
                    .get(0)
                    .path("geometry")
                    .path("location");

            double lat = location.path("lat").asDouble();
            double lng = location.path("lng").asDouble();

            return List.of(lat, lng);
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }




}
