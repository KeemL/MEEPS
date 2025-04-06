package com.example.MEEPS.service;


public interface HealthService {
    public String checkPatient();
    public String determineRiskFactors(String userInput);
}