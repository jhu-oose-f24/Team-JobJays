package com.example.jobjays.repository;

import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.ApplicantResume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicantResumeRepository extends JpaRepository<ApplicantResume, Long> {

  List<ApplicantResume> findByUserId(Long userId);
  //TODO CREATE A JOB APPLICATION REPOSITORY










}
