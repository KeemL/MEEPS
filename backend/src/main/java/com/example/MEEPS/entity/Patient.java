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
    List<Integer> coordinates;

    @ElementCollection
    @JsonProperty("conditions")
    List<String> conditions;

    public Patient(String firstName, String lastName, String birthDate, List<Integer> coordinates,
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

//    @Override
//    public String toString() {
//        return String.format("New Patient: %s %s, %s, coordinates: %s, healthConditions: %s", firstname, lastname, birthdate, coordinates, healthConditions);
//    }


}
