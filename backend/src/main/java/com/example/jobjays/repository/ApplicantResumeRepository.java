package com.example.jobjays.repository;

import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.ApplicantResume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicantResumeRepository extends JpaRepository<ApplicantResume, Long> {

  //@Query("SELECT a.resume_id,a.resumeName,null,a.userName,a.userId,a.uploadedAt FROM ApplicantResume a WHERE a.userId = :userId")
  @Query("SELECT new com.example.jobjays.model.ApplicantResume(a.resume_id, a.resumeName, a.userName, a.userId, a.uploadedAt) " +
          "FROM ApplicantResume a WHERE a.userId = :userId")
  List<ApplicantResume> findByUserId(Long userId);










}
