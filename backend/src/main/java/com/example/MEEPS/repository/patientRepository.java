package com.example.MEEPS.repository;

import com.example.MEEPS.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface patientRepository extends JpaRepository<Patient, Long> {

}
