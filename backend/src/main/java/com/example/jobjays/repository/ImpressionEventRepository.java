package com.example.jobjays.repository;

import com.example.jobjays.model.ImpressionEvent;
import com.example.jobjays.model.Impressions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ImpressionEventRepository extends JpaRepository<ImpressionEvent, Long> {

  @Query("SELECT e FROM ImpressionEvent e WHERE e.impressions.jobPost.jobID = :jobPostId AND e.eventDate BETWEEN :startDate AND :endDate")
  List<ImpressionEvent> findImpressionsBetween(
      @Param("jobPostId") Long jobPostId,
      @Param("startDate") LocalDateTime startDate,
      @Param("endDate") LocalDateTime endDate
  );

  @Query("SELECT COUNT(e) FROM ImpressionEvent e WHERE e.impressions.jobPost.jobID = :jobPostId AND e.eventDate < :startDate")
  Integer findImpressionEventsBeforeDate(
      @Param("jobPostId") Long jobPostId,
      @Param("startDate") LocalDateTime startDate
  );

}
