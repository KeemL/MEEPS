package com.example.MEEPS.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.example.MEEPS.service.HealthServiceImplementation.createMap;


public interface HealthService {
    public String checkPatient();

    public static String translateCoordinates() {
        Map<String, Map<String, Integer>> location = createMap();
        List<Integer> coords = new ArrayList<>();
        System.out.println("location"+ location);
        return "success";
    }
}
