package com.example.MEEPS.controller;

import com.example.MEEPS.entity.Patient;
import com.example.MEEPS.service.HealthService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class HealthController {

    private final HealthService healthService;


    public HealthController(HealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping("/")
    public ResponseEntity<String> welcomePatient() {
        return ResponseEntity.ok("welcome Patient");
    }


    @PostMapping("/submit")
    public ResponseEntity<String> checkPatient(@RequestBody Patient patient) {
//      RequestBody maps the patient form submission into a Patient class, which I print out
        String patientData = patient.toString();
        System.out.println("patientData:" + patientData);
        return ResponseEntity.ok(patientData);
    }

    @GetMapping("/search")
    public ResponseEntity<String> translateCoordinates() {
        String test = HealthService.translateCoordinates();
        System.out.println("translateCoordinates() function in healthController");
        return ResponseEntity.ok(test);
    }

//    @GetMapping("/coordinates")

}
