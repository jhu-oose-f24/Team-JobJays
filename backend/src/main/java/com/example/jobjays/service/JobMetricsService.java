package com.example.jobjays.service;

import com.example.jobjays.dto.ImpressionEventChartDto;
import com.example.jobjays.model.*;
import com.example.jobjays.repository.ImpressionEventRepository;
import com.example.jobjays.repository.ImpressionsRepository;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.example.jobjays.model.ImpressionType.JOB_POST;
import static com.example.jobjays.model.ImpressionType.PROFILE;

@Service
public class JobMetricsService {
  private final ImpressionsRepository impressionsRepository;
  private final ImpressionEventRepository impressionEventRepository;
  private final JobPostService jobPostService;

  @Autowired
  private EmployerService employerService;

  public JobMetricsService(ImpressionsRepository impressionsRepository, ImpressionEventRepository impressionEventRepository, JobPostService jobPostService) {
    this.impressionsRepository = impressionsRepository;
    this.impressionEventRepository = impressionEventRepository;
    this.jobPostService = jobPostService;
  }

  // For updating cumulative count
  public void addJobImpressionEvent(@NotNull JobPost jobPost) {
    ImpressionEvent newEvent = jobPost.addImpression(); //logs impression, creates and logs if there isnt an impression already
    //impressionsRepository.save(jobPost.getImpressions());
    impressionEventRepository.save(newEvent); // Log event
  }

  public void addProfileImpressionEvent(@NotNull Employer employer) {
//    ImpressionEvent newEvent = employer.getProfile().addImpression(); //logs impression, creates and logs if there isnt an impression already
    ImpressionEvent newEvent = employer.addImpression();
    impressionsRepository.save(employer.getProfile().getImpressions());
    //impressionEventRepository.save(newEvent); // Log event
  }

  // For querying between dates
  public List<ImpressionEvent> getJobImpressionsByDateRange(Long jobPostId, LocalDateTime start, LocalDateTime end) {
    return impressionEventRepository.findJobImpressionsBetween(jobPostId, start, end);
  }

  public List<ImpressionEvent> getProfileImpressionsByDateRange(Long jobPostId, LocalDateTime start, LocalDateTime end) {
    return impressionEventRepository.findProfileImpressionsBetween(jobPostId, start, end);
  }

  public Integer getJobImpressionsBeforeDate(Long jobPostId, LocalDateTime start) {
    return impressionEventRepository.findJobImpressionEventsBeforeDate(jobPostId, start);
  }

  public Integer getProfileImpressionsBeforeDate(Long jobPostId, LocalDateTime start) {
    return impressionEventRepository.findProfileImpressionEventsBeforeDate(jobPostId, start);
  }

  // Total impressions by date range for a list of job posts
  public List<ImpressionEvent> getJobImpressionsByDateRange(List<JobPost> jobPosts, LocalDateTime start, LocalDateTime end) {
    return jobPosts.stream()
        .flatMap(jobPost -> impressionEventRepository.findJobImpressionsBetween(jobPost.getID(), start, end).stream())
        .collect(Collectors.toList());
  }

  public List<ImpressionEvent> getProfileImpressionsByDateRange(List<JobPost> jobPosts, LocalDateTime start, LocalDateTime end) {
    return jobPosts.stream()
        .flatMap(jobPost -> impressionEventRepository.findProfileImpressionsBetween(jobPost.getID(), start, end).stream())
        .collect(Collectors.toList());
  }


  // Total impressions before a specific date for a list of job posts
  public Integer getJobImpressionsBeforeDate(List<JobPost> jobPosts, LocalDateTime date) {
    return jobPosts.stream()
        .mapToInt(jobPost -> impressionEventRepository.findJobImpressionEventsBeforeDate(jobPost.getID(), date))
        .sum();
  }

  public Integer getProfileImpressionsBeforeDate(List<JobPost> jobPosts, LocalDateTime date) {
    return jobPosts.stream()
        .mapToInt(jobPost -> impressionEventRepository.findProfileImpressionEventsBeforeDate(jobPost.getID(), date))
        .sum();
  }

  // Overloaded method for date range, given employer ID
  public List<ImpressionEvent> getEmployerJobImpressionsByDateRange(Long employerId, LocalDateTime start, LocalDateTime end) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByEmployerId(employerId);
    return getJobImpressionsByDateRange(jobPosts, start, end);
  }

  public List<ImpressionEvent> getEmployerProfileImpressionsByDateRange(Long employerId, LocalDateTime start, LocalDateTime end) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByEmployerId(employerId);
    return getProfileImpressionsByDateRange(jobPosts, start, end);
  }

  // Overloaded method for impressions before date, given employer ID
  public Integer getEmployerJobImpressionsBeforeDate(Long employerId, LocalDateTime date) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByEmployerId(employerId);
    return getJobImpressionsBeforeDate(jobPosts, date);
  }

  public Integer getEmployerProfileImpressionsBeforeDate(Long employerId, LocalDateTime date) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByEmployerId(employerId);
    return getProfileImpressionsBeforeDate(jobPosts, date);
  }

  // For getting total impressions
  public Integer getTotalJobImpressions(Long jobPostId) {
    Impressions impressions = impressionsRepository.findJobImpressionsByJobPost_ID(jobPostId);
    return impressions != null ? impressions.getTotalImpressions() : 0;
  }

  public Integer getTotalProfileImpressions(Long jobPostId) {
    Impressions impressions = impressionsRepository.findProfileImpressionsByJobPost_ID(jobPostId);
    return impressions != null ? impressions.getTotalImpressions() : 0;
  }

  public Integer getTotalEmployerJobImpressions(Long employerId) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByEmployerId(employerId);
    return getTotalImpressionsForJobPosts(jobPosts);
  }

  public Integer getTotalEmployerProfileImpressions(Long employerId) {
    EmployerProfile employerProfile = employerService.findEmployerProfileById(employerId);
    return employerProfile.getImpressions().getTotalImpressions();
  }


  public Integer getTotalImpressionsForJobPosts(List<JobPost> jobPosts) {
    return jobPosts.stream()
        .map(JobPost::getImpressions)           // Get impressions for each job post
        .filter(impressions -> impressions != null) // Ensure impressions are not null
        .mapToInt(Impressions::getTotalImpressions) // Get the total impressions count
        .sum();                                  // Sum the total impressions
  }

  public List<ImpressionEventChartDto> getJobImpressionDataForChart(Long employerId) {
    List<ImpressionEvent> impressionEvents = impressionEventRepository.findJobImpressionEventsByEmployerId(employerId);
    return aggregateImpressionsForChart(impressionEvents);
  }

  public List<ImpressionEventChartDto> getProfileImpressionDataForChart(Long employerId) {
    List<ImpressionEvent> impressionEvents = impressionEventRepository.findProfileImpressionEventsByEmployerId(employerId);
    return aggregateImpressionsForChart(impressionEvents);
  }

  public List<ImpressionEvent> getAllImpressionsByEmployerId(Long employerId) {
    List<ImpressionEvent> employerImpressionEvents = new ArrayList<>();
    employerImpressionEvents.addAll(impressionEventRepository.findJobImpressionEventsByEmployerId(employerId));
    employerImpressionEvents.addAll(impressionEventRepository.findProfileImpressionEventsByEmployerId(employerId));

    return employerImpressionEvents;
  }

  public List<ImpressionEventChartDto> getChartData(Long employerId) {
    List<ImpressionEvent> impressionEvents = getAllImpressionsByEmployerId(employerId);
    return aggregateImpressionsForChart(impressionEvents);
  }


  public List<ImpressionEventChartDto> aggregateImpressionsForChart(List<ImpressionEvent> impressionEvents) {
    // Group by date (LocalDate) and count occurrences
    Map<LocalDate, Map<ImpressionType, Long>> aggregatedData = impressionEvents.stream()
        .collect(Collectors.groupingBy(
            event -> event.getEventDate().toLocalDate(), // Group by date
            Collectors.groupingBy(
                ImpressionEvent::getImpressionType, // Group by type (Job Post or Profile)
                Collectors.counting() // Count occurrences for each
            )
        ));



    // Convert the map to a list of DTOs
    return aggregatedData.entrySet().stream()
        .map(entry -> {
          LocalDate date = entry.getKey();
          Map<ImpressionType, Long> platformCounts = entry.getValue();
          long jobCount = platformCounts.getOrDefault(JOB_POST, 0L);
          long profileCount = platformCounts.getOrDefault(PROFILE, 0L);
          return new ImpressionEventChartDto(date, jobCount, profileCount);
        })
        .collect(Collectors.toList());

  }



}
