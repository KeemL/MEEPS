package com.example.MEEPS.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.MEEPS.service.healthService;

@RestController
public class healthController {

    private final healthService healthService;

    public healthController(healthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping("/")
    public ResponseEntity<String> welcomePatient() {
        return ResponseEntity.ok("welcome Patient");
    }


    /**
     * Endpoint for processing patient data submitted from the frontend.
     *
     * <p>
     * Expected API Input (via POST):
     * <pre>
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
     *           "coordinates": [-74.0060, 40.7128] // New York, NY
     *         },
     *         "properties": {
     *           "name": "New York, NY"
     *         }
     *       },
     *       // ... more features ...
     *     ]
     *   }
     * }
     * </pre>
     * </p>
     *
     * <p>
     * Expected API Response:
     * <pre>
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
     *         },
     *         "risk_factor": ["Pollen", "Air Pollution"]
     *       },
     *       // ... more features ...
     *     ]
     *   }
     * }
     * </pre>
     * This response contains the updated geojson with risk factors assigned by the backend.
     * If the backend does not process the risk factors, the frontend falls back to the provided input.
     * </p>
     *
     * @return ResponseEntity containing a string representation of the processed user input data.
     */
    @GetMapping("/submit")
    public ResponseEntity<String> checkPatient() {

        /*
        see frontend/src/app/page.tsx for expected response.
        */

        return ResponseEntity.ok("UserInput");
    }

}
