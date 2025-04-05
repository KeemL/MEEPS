package com.example.MEEPS.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String firstname;

    String lastname;


}
