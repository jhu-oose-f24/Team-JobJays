package com.example.jobjays.repository;

import com.example.jobjays.model.Impressions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ImpressionsRepository extends JpaRepository<Impressions, Long> {

  // Find Impressions for a specific JobPost by jobPost ID
  @Query("select i from Impressions i where i.jobPost.jobID = :jobPostId AND i.impressionType = 'JOB_POST'")
  Impressions findJobImpressionsByJobPost_ID(Long jobPostId);


  @Query("select i from Impressions i where i.jobPost.jobID = :jobPostId AND i.impressionType = 'PROFILE'")
  Impressions findProfileImpressionsByJobPost_ID(Long jobPostId);




}
