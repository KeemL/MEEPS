package com.example.MEEPS.controller;

import com.example.MEEPS.entity.Patient;
import com.example.MEEPS.service.GeocodingService;
import com.example.MEEPS.service.HealthService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//import com.example.MEEPS.service.healthService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class healthController {

    private final HealthService healthService;
    private final GeocodingService geocodingService;

    public healthController(HealthService healthService, GeocodingService geocodingService) {
        this.healthService = healthService;
        this.geocodingService = geocodingService;
    }

    @PostMapping("/submit")
    public ResponseEntity<String> checkPatient(@RequestBody Patient patient) {
//      RequestBody maps the patient form submission into a Patient class, which I print out
        String patientData = patient.toString();

        System.out.println("patient:" + patient);

        List<Double> coordinates = geocodingService.geocode(patient.getAddress());
        if (!coordinates.isEmpty()) {
            patient.setCoordinates(coordinates);
            System.out.println("coordinates are" + patient.getCoordinates().toString());
            String patientData2 = patient.toString();

            System.out.println("patientData:" + patientData2);
        } else {
            System.out.println("Could not fetch coordinates for address: " + patient.getAddress());
        }

        return ResponseEntity.ok(patientData);
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


}
