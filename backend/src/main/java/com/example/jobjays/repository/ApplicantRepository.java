package com.example.jobjays.repository;

import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.ApplicantProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.jobjays.model.JobPost;

import java.util.List;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {

  List<Applicant> findAllByUsernameContainingIgnoreCase(String name);

  List<Applicant> findAllByEmailContainingIgnoreCase(String email);

  Applicant findByUsernameIs(String username);










}
