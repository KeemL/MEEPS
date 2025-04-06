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


    @GetMapping("/submit")
    public ResponseEntity<String> checkPatient() {

        /*
        see frontend/src/app/page.tsx for expected response.
        */

        return ResponseEntity.ok("UserInput");
    }

}
