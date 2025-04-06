package com.example.MEEPS.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class HealthServiceImplementation implements HealthService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    private String meersenKey = "https://api.meersens.com/environment/public";

    public HealthServiceImplementation(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    @Override
    public String checkPatient() {

        return "Patient is good to go.";
    }

    public String translateCoordinates() {
        Map<String, Map<String, Integer>> location = createMap();
        List<Integer> coords = new ArrayList<>();
        System.out.println("location"+ location);


//        Map<String, Object> test = geocodeDTO.extractCoordinates(geometry);
        return "successful";
    }


    public static Map<String, Map<String, Integer>> createMap() {
        Map<String, Integer> hm = new HashMap<>();
        hm.put("lat", 37);
        hm.put("lng", -122);
        System.out.println(hm);

        Map<String, Map<String, Integer>> location = new HashMap<>();
        location.put("location", hm);

        Map<String, Map<String, Map<String, Integer>>> geometry = new HashMap<>();

        geometry.put("geometry", location);


        System.out.println(geometry);
        return location;

    }
}
