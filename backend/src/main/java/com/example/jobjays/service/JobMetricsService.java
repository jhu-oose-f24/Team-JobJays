package com.example.jobjays.service;

import com.example.jobjays.dto.ImpressionEventDto;
import com.example.jobjays.model.ImpressionEvent;
import com.example.jobjays.model.Impressions;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.repository.ImpressionEventRepository;
import com.example.jobjays.repository.ImpressionsRepository;
import jakarta.validation.constraints.NotNull;
import org.hibernate.query.Page;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JobMetricsService {
  private final ImpressionsRepository impressionsRepository;
  private final ImpressionEventRepository impressionEventRepository;
  private final JobPostService jobPostService;

  public JobMetricsService(ImpressionsRepository impressionsRepository, ImpressionEventRepository impressionEventRepository, JobPostService jobPostService) {
    this.impressionsRepository = impressionsRepository;
    this.impressionEventRepository = impressionEventRepository;
    this.jobPostService = jobPostService;
  }

  // For updating cumulative count
  public void addImpressionEvent(@NotNull JobPost jobPost) {
    ImpressionEvent newEvent = jobPost.addImpression(); //logs impression, creates and logs if there isnt an impression already
    impressionsRepository.save(jobPost.getImpressions());
    impressionEventRepository.save(newEvent); // Log event
  }

  // For querying between dates
  public List<ImpressionEvent> getImpressionsByDateRange(Long jobPostId, LocalDateTime start, LocalDateTime end) {
    return impressionEventRepository.findImpressionsBetween(jobPostId, start, end);
  }

  public Integer getImpressionsBeforeDate(Long jobPostId, LocalDateTime start) {
    return impressionEventRepository.findImpressionEventsBeforeDate(jobPostId, start);
  }

  // Total impressions by date range for a list of job posts
  public List<ImpressionEvent> getImpressionsByDateRange(List<JobPost> jobPosts, LocalDateTime start, LocalDateTime end) {
    return jobPosts.stream()
        .flatMap(jobPost -> impressionEventRepository.findImpressionsBetween(jobPost.getID(), start, end).stream())
        .collect(Collectors.toList());
  }

  // Total impressions before a specific date for a list of job posts
  public Integer getImpressionsBeforeDate(List<JobPost> jobPosts, LocalDateTime date) {
    return jobPosts.stream()
        .mapToInt(jobPost -> impressionEventRepository.findImpressionEventsBeforeDate(jobPost.getID(), date))
        .sum();
  }

  // Overloaded method for date range, given employer ID
  public List<ImpressionEvent> getEmployerImpressionsByDateRange(Long employerId, LocalDateTime start, LocalDateTime end) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByEmployerId(employerId);
    return getImpressionsByDateRange(jobPosts, start, end);
  }

  // Overloaded method for impressions before date, given employer ID
  public Integer getEmployerImpressionsBeforeDate(Long employerId, LocalDateTime date) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByEmployerId(employerId);
    return getImpressionsBeforeDate(jobPosts, date);
  }

  // For getting total impressions
  public Integer getTotalImpressions(Long jobPostId) {
    Impressions impressions = impressionsRepository.findImpressionsByJobPost_ID(jobPostId);
    return impressions != null ? impressions.getTotalImpressions() : 0;
  }

  public Integer getTotalEmployerImpressions(Long employerId) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByEmployerId(employerId);
    return getTotalImpressionsForJobPosts(jobPosts);
  }

  public Integer getTotalImpressionsForJobPosts(List<JobPost> jobPosts) {
    return jobPosts.stream()
        .map(JobPost::getImpressions)           // Get impressions for each job post
        .filter(impressions -> impressions != null) // Ensure impressions are not null
        .mapToInt(Impressions::getTotalImpressions) // Get the total impressions count
        .sum();                                  // Sum the total impressions
  }

  public List<ImpressionEventDto> getImpressionDataForChart(Long employerId) {
    List<ImpressionEvent> impressionEvents = impressionEventRepository.findByEmployerId(employerId);
    return aggregateImpressionsForChart(impressionEvents);
  }

  public List<ImpressionEventDto> aggregateImpressionsForChart(List<ImpressionEvent> impressionEvents) {
    // Group by date (LocalDate) and count occurrences
    Map<LocalDate, Long> aggregatedData = impressionEvents.stream()
        .collect(Collectors.groupingBy(
            event -> event.getEventDate().toLocalDate(), // Extract date with Month, Day, Year
            Collectors.counting() // Count the number of events for each date
        ));


    // Convert the map to a list of DTOs
    return aggregatedData.entrySet().stream()
        .map(entry -> ImpressionEventDto.from(entry.getKey(), entry.getValue()))
        .collect(Collectors.toList());
  }



}
