package com.example.MEEPS.service;
import com.fasterxml.jackson.databind.JsonNode;
import com.example.MEEPS.entity.Patient;

public interface HealthService {
    public String checkPatient();
    public String determineRiskFactors(String userInput);
    public int checkAQI(double latitude, double longitude);
    public double checkPollenIndex(double latitude, double longitude);
    public double checkUVIndex(double latitude, double longitude);
    public double checkTemperature(double latitude, double longitude);
    public JsonNode processPatient(Patient patient);
}