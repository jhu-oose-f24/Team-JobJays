package com.example.jobjays.repository;

import com.example.jobjays.model.ImpressionEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ImpressionEventRepository extends JpaRepository<ImpressionEvent, Long> {

  @Query("SELECT e FROM ImpressionEvent e WHERE e.impressions.jobPost.jobID = :jobPostId AND e.eventDate BETWEEN :startDate AND :endDate AND e.impressionType = 'JOB_POST'")
  List<ImpressionEvent> findJobImpressionsBetween(
      @Param("jobPostId") Long jobPostId,
      @Param("startDate") LocalDateTime startDate,
      @Param("endDate") LocalDateTime endDate
  );

  @Query("SELECT COUNT(e) FROM ImpressionEvent e WHERE e.impressions.jobPost.jobID = :jobPostId AND e.eventDate < :startDate AND e.impressionType = 'JOB_POST'")
  Integer findJobImpressionEventsBeforeDate(
      @Param("jobPostId") Long jobPostId,
      @Param("startDate") LocalDateTime startDate
  );

  @Query("SELECT ie FROM ImpressionEvent ie " +
      "WHERE ie.impressionType = 'JOB_POST' AND ie.impressions.jobPost.jobID IN " +
      "(SELECT jp.jobID FROM JobPost jp WHERE jp.employer.employer_id = :employerId )")
  List<ImpressionEvent> findJobImpressionEventsByEmployerId(@Param("employerId") Long employerId);


  @Query("SELECT e FROM ImpressionEvent e WHERE e.impressions.jobPost.jobID = :jobPostId AND e.eventDate BETWEEN :startDate AND :endDate AND e.impressionType = 'PROFILE'")
  List<ImpressionEvent> findProfileImpressionsBetween(
      @Param("jobPostId") Long jobPostId,
      @Param("startDate") LocalDateTime startDate,
      @Param("endDate") LocalDateTime endDate
  );

  @Query("SELECT COUNT(e) FROM ImpressionEvent e WHERE e.impressions.jobPost.jobID = :jobPostId AND e.eventDate < :startDate AND e.impressionType = 'PROFILE'")
  Integer findProfileImpressionEventsBeforeDate(
      @Param("jobPostId") Long jobPostId,
      @Param("startDate") LocalDateTime startDate
  );

  @Query("SELECT ie FROM ImpressionEvent ie " +
      "WHERE ie.impressionType = 'PROFILE' AND ie.impressions.jobPost.jobID IN " +
      "(SELECT jp.jobID FROM JobPost jp WHERE jp.employer.employer_id = :employerId)")
  List<ImpressionEvent> findProfileImpressionEventsByEmployerId(@Param("employerId") Long employerId);


  @Query("""
        SELECT e
        FROM ImpressionEvent e
        WHERE e.impressions.jobPost.employer.employer_id = :employerId
           OR e.impressions.employer.employer_id= :employerId
    """)
  List<ImpressionEvent> findAllImpressionEventsByEmployerId(@Param("employerId") Long employerId);

}
