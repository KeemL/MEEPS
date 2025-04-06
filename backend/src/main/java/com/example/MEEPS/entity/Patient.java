package com.example.MEEPS.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
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
    String firstname;

    String lastname;

    String birthdate;

    @Getter @Setter
    @ElementCollection
    List<Integer> coordinates;
    @Getter @Setter
    @ElementCollection
    List<String> healthConditions;

    public Patient(String firstname, String lastname, String birthdate, List<Integer> coordinates,
                   List<String> healthConditions) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.coordinates = coordinates;
        this.healthConditions = healthConditions;
    }

    public Patient() {
        super();
    }

//    @Override
//    public String toString() {
//        return String.format("New Patient: %s %s, %s, coordinates: %s, healthConditions: %s", firstname, lastname, birthdate, coordinates, healthConditions);
//    }


}
