package com.example.MEEPS.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
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

    public Patient(String firstName, String lastName, String birthDate, List<Double> coordinates,
                   List<String> conditions) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.coordinates = coordinates;
        this.conditions = conditions;
    }

    public Patient() {}

    @Override
    public String toString() {
        return "Patient{" +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", birthdate=" + birthDate +
                ", address='" + address + '\'' +
                ", coordinates=" + coordinates +
                ", conditions=" + conditions +
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
