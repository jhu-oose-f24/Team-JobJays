package com.example.jobjays.controller;

import com.example.jobjays.auth.AuthService;
import com.example.jobjays.auth.CustomAuthenticationDetails;
import com.example.jobjays.dto.ImpressionEventChartDto;
import com.example.jobjays.dto.ResponseImpressionsDto;
import com.example.jobjays.exception.UserNotFoundException;
import com.example.jobjays.model.Employer;
import com.example.jobjays.model.EmployerProfile;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.service.EmployerService;
import com.example.jobjays.service.JobMetricsService;
import com.example.jobjays.service.JobPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/metrics")
public class JobMetricsController {
    // This class will handle job metrics related endpoints
    // Add methods to handle various metrics related to job posts, impressions, etc.
    private final JobMetricsService jobMetricsService;
    private final JobPostService jobPostService;
    private final EmployerService employerService;

    public JobMetricsController(JobMetricsService jobMetricsService, JobPostService jobPostService, EmployerService employerService) {
      this.jobMetricsService = jobMetricsService;
      this.jobPostService = jobPostService;
      this.employerService = employerService;
    }

  private String getCurrentUserId() {
    CustomAuthenticationDetails details = (CustomAuthenticationDetails)
        SecurityContextHolder.getContext().getAuthentication().getDetails();
    return details != null ? details.getUserId() : null;
  }

  private Long parsedUserId() {
    String userId = getCurrentUserId();
    if (userId == null) {
      throw new UserNotFoundException("Cannot find Authenticated User"); // Prevents access to another user's data
    }
    return Long.parseLong(userId);
  }

  @PreAuthorize("hasAuthority('APPLICANT')")
  @PostMapping("/impressions/{jobPostId}/post")
  public ResponseEntity<Void> addJobImpressionEvent(@PathVariable Long jobPostId) {
    JobPost jobPost = jobPostService.getJobPostById(jobPostId);
    if (jobPost == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    jobMetricsService.addJobImpressionEvent(jobPost);
    return new ResponseEntity<>(HttpStatus.CREATED);

  }

  @PreAuthorize("hasAuthority('APPLICANT')")
  @PostMapping("/impressions/{employerUsername}/profile")
  public ResponseEntity<Void> addProfileImpressionEvent(@PathVariable String employerUsername) {
    Employer employerProfile = employerService.findEmployerByUsername(employerUsername);
    if (employerProfile == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    jobMetricsService.addProfileImpressionEvent(employerProfile);
    return new ResponseEntity<>(HttpStatus.CREATED);

  }

  @PreAuthorize("hasAuthority('EMPLOYER')")
  @GetMapping("/impressions/{jobPostId}")
  public ResponseEntity<ResponseImpressionsDto> getJobImpressionsCount(@PathVariable Long jobPostId) {
    Integer totalImpressions = jobMetricsService.getTotalJobImpressions(jobPostId);
    ResponseImpressionsDto responseDto = ResponseImpressionsDto.builder()
        .impressionsCount(totalImpressions)
        .build();
    return new ResponseEntity<>(responseDto, HttpStatus.OK);
  }

  @PreAuthorize("hasAuthority('EMPLOYER')")
  @GetMapping("/impressions/employer/total")
  public ResponseEntity<ResponseImpressionsDto> getTotalImpressionsForEmployer() {
    Long employerId = parsedUserId();
    Integer totalImpressions = jobMetricsService.getTotalEmployerJobImpressions(employerId);
    ResponseImpressionsDto responseDto = ResponseImpressionsDto.builder()
        .impressionsCount(totalImpressions)
        .build();
    return new ResponseEntity<>(responseDto, HttpStatus.OK);
  }

  @PreAuthorize("hasAuthority('EMPLOYER')")
  @GetMapping("/impressions/range")
  public ResponseEntity<ResponseImpressionsDto> getImpressionsByDateRange(
      @RequestParam("start") String start,
      @RequestParam("end") String end) {
    Long employerId = parsedUserId();
    LocalDateTime startDate = LocalDateTime.parse(start);
    LocalDateTime endDate = LocalDateTime.parse(end);
    Integer totalImpressions = jobMetricsService.getEmployerJobImpressionsByDateRange(employerId, startDate, endDate).size();
    ResponseImpressionsDto responseDto = ResponseImpressionsDto.builder()
        .impressionsCount(totalImpressions)
        .build();
    return new ResponseEntity<>(responseDto, HttpStatus.OK);
  }

  @PreAuthorize("hasAuthority('EMPLOYER')")
  @GetMapping("/impressions/before")
  public ResponseEntity<ResponseImpressionsDto> getImpressionsBeforeDate(@RequestParam("date") String date) {
    Long employerId = parsedUserId();
    LocalDateTime beforeDate = LocalDateTime.parse(date);
    Integer impressionCount = jobMetricsService.getEmployerJobImpressionsBeforeDate(employerId, beforeDate);
    ResponseImpressionsDto responseDto = ResponseImpressionsDto.builder()
        .impressionsCount(impressionCount)
        .build();
    return new ResponseEntity<>(responseDto, HttpStatus.OK);
  }

  @PreAuthorize("hasAuthority('EMPLOYER')")
  @GetMapping("/impressions/chart")
  public ResponseEntity<List<ImpressionEventChartDto>> getImpressionDataForChart() {
    Long employerId = parsedUserId();
    List<ImpressionEventChartDto> chartData = jobMetricsService.getChartData(employerId);
    return ResponseEntity.ok(chartData);
  }

  private ResponseImpressionsDto convertToDto(Integer impressionCount) {
        return ResponseImpressionsDto.builder()
                .impressionsCount(impressionCount)
                .build();
    }


}


