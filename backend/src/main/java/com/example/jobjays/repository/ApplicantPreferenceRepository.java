package com.example.jobjays.repository;

import com.example.jobjays.model.ApplicantPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicantPreferenceRepository extends JpaRepository<ApplicantPreference, Long> {

    @Query("SELECT a FROM ApplicantPreference a WHERE a.applicant.applicantId = :applicantId")
    ApplicantPreference findByApplicantId(@Param("applicantId") Long applicantId);

}
