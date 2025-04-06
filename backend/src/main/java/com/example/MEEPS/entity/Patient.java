package com.example.MEEPS.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @JsonProperty("firstName")
    String firstName;

    @JsonProperty("lastName")
    String lastName;

    @JsonProperty("birthDate")
    String birthDate;

    @JsonProperty("address")
    String address;

    @ElementCollection
    List<Double> coordinates;


    @ElementCollection
    @JsonProperty("conditions")
    List<String> conditions;


    @JsonProperty("geojson")
    @Transient   // Optional: use @Transient if you do not wish to persist geojson in the database.
    JsonNode geojson;

    public Patient(String firstName, String lastName, String birthDate, String address, 
                   List<String> conditions, JsonNode geojson) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.address = address;
        this.conditions = conditions;
        this.geojson = geojson;
    }

    public Patient() {}

    public JsonNode getGeojson() {
        return geojson;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", birthDate='" + birthDate + '\'' +
                ", address='" + address + '\'' +
                ", conditions=" + conditions +
                ", geojson=" + geojson +
                '}';
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Double> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<Double> coordinates) {
        this.coordinates = coordinates;
    }

//    @Override
//    public String toString() {
//        return String.format("New Patient: %s %s, %s, coordinates: %s, healthConditions: %s", firstname, lastname, birthdate, coordinates, healthConditions);
//    }

}