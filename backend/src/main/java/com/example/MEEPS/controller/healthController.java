package com.example.MEEPS.controller;

import com.example.MEEPS.entity.Patient;
import com.example.MEEPS.service.HealthService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;  // Added import
import java.util.List;       // Added import

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class healthController {

    private final HealthService healthService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public healthController(HealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping("/")
    public ResponseEntity<String> welcomePatient() {
        return ResponseEntity.ok("welcome Patient");
    }

    /**
     * Endpoint for processing patient data submitted from the frontend.
     *
     * Expected API Input:
     * {
     *   "firstName": "John",
     *   "lastName": "Doe",
     *   "birthDate": "YYYY-MM-DD",
     *   "address": "123 Main St, City, State",
     *   "conditions": ["Pollen", "Air Pollution", "UV Index"],
     *   "geojson": {
     *     "type": "FeatureCollection",
     *     "features": [
     *       {
     *         "type": "Feature",
     *         "geometry": {
     *           "type": "Point",
     *           "coordinates": [-74.0060, 40.7128]
     *         },
     *         "properties": {
     *           "name": "New York, NY"
     *         }
     *       }
     *       // ... more features ...
     *     ]
     *   }
     * }
     *
     * Expected API Response:
     * {
     *   "geojson": {
     *     "type": "FeatureCollection",
     *     "features": [
     *       {
     *         "type": "Feature",
     *         "geometry": {
     *           "type": "Point",
     *           "coordinates": [-74.0060, 40.7128]
     *         },
     *         "properties": {
     *           "name": "New York, NY",
     *           "risk_factor": ["Pollen", "Air Pollution"]
     *         }
     *       }
     *       // ... more features ...
     *     ]
     *   }
     * }
     */
    @PostMapping("/submit")
    public ResponseEntity<JsonNode> checkPatient(@RequestBody Patient patient) {
        System.out.println("Received patient: " + patient);

        // Get the geojson object from the patient
        JsonNode geojson = patient.getGeojson();
        if (geojson != null && geojson.has("features") && geojson.get("features").isArray()) {
            for (JsonNode feature : geojson.get("features")) {
                // Extract coordinates (assuming [longitude, latitude])
                JsonNode geometry = feature.path("geometry");
                JsonNode coordinates = geometry.path("coordinates");
                if (coordinates.isArray() && coordinates.size() >= 2) {
                    double longitude = coordinates.get(0).asDouble();
                    double latitude = coordinates.get(1).asDouble();

                    // Call service methods to retrieve environmental data
                    int aqi = healthService.checkAQI(latitude, longitude);
                    double pollenIndex = healthService.checkPollenIndex(latitude, longitude);
                    double uvIndex = healthService.checkUVIndex(latitude, longitude);
                    double temperature = healthService.checkTemperature(latitude, longitude);

                    // Build a list of risk factors based on thresholds
                    List<String> riskFactors = new ArrayList<>();
                    if (aqi > 50) {
                        riskFactors.add("Air Pollution");
                    }
                    if (pollenIndex > 30) {
                        riskFactors.add("Pollen");
                    }
                    if (uvIndex > 7) {
                        riskFactors.add("UV Index");
                    }
                    if (temperature > 30) {
                        riskFactors.add("Heat");
                    }

                    // Ensure the feature has a properties node; create one if missing
                    ObjectNode featureObj = (ObjectNode) feature;
                    ObjectNode properties = featureObj.has("properties")
                            ? (ObjectNode) featureObj.get("properties")
                            : objectMapper.createObjectNode();
                    featureObj.set("properties", properties);

                    // Add the risk_factor property as an array
                    ArrayNode riskArray = objectMapper.createArrayNode();
                    for (String risk : riskFactors) {
                        riskArray.add(risk);
                    }
                    featureObj.set("risk_factors", riskArray);
                }
            }
        }

        // Return the updated geojson as part of the response
        ObjectNode responseNode = objectMapper.createObjectNode();
        responseNode.set("geojson", geojson);
        return ResponseEntity.ok(responseNode);
    }
}