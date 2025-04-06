package com.example.MEEPS.entity;

import java.util.ArrayList;
import java.util.Map;

public class geocodeDTO {
    private ArrayList<Map<String, Object>> results;
//    private Map<String, >


    public geocodeDTO(ArrayList<Map<String, Object>> results) {
        this.results = results;
    }

    public geocodeDTO() {}

    public static Map<String, Object> extractCoordinates(ArrayList<Map<String, Object>> results) {
        // Obtaining each Map
        for (Map<String, Object> result : results) {
            // Checking each key in an individual Map
            for (String key : result.keySet()) {
                if (key == "geometry") {
                    System.out.println("Result:" + result);
                    return result;
                }
            }
        }
        return null;
    }

}
