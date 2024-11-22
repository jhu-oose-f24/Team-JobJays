package com.example.jobjays.controller;

import com.example.jobjays.auth.AuthService;
import com.example.jobjays.auth.CustomAuthenticationDetails;
import com.example.jobjays.dto.ImpressionEventDto;
import com.example.jobjays.dto.ResponseImpressionsDto;
import com.example.jobjays.exception.UserNotFoundException;
import com.example.jobjays.model.ImpressionEvent;
import com.example.jobjays.model.Impressions;
import com.example.jobjays.model.JobPost;
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
    private final AuthService authService;

    public JobMetricsController(JobMetricsService jobMetricsService, JobPostService jobPostService, AuthService authService) {
      this.jobMetricsService = jobMetricsService;
      this.jobPostService = jobPostService;
      this.authService = authService;
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

  @GetMapping("/user-type")
  public ResponseEntity<Map<String, String>> getUserType() {

    String userType = authService.getUserType();
    Map<String, String> response = new HashMap<>();
    response.put("userType", userType);
    return ResponseEntity.ok(response);
  }


//  @GetMapping("/user-type")
//  public String getUserType() {
//    return authService.getUserType();
//  }

  @PreAuthorize("hasAuthority('APPLICANT')")
  @PostMapping("/impressions/{jobPostId}")
  public ResponseEntity<Void> addImpressionEvent(@PathVariable Long jobPostId) {
    JobPost jobPost = jobPostService.getJobPostById(jobPostId);
    if (jobPost == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    jobMetricsService.addImpressionEvent(jobPost);
    return new ResponseEntity<>(HttpStatus.CREATED);

  }

  @PreAuthorize("hasAuthority('EMPLOYER')")
  @GetMapping("/impressions/{jobPostId}")
  public ResponseEntity<ResponseImpressionsDto> getJobImpressionsCount(@PathVariable Long jobPostId) {
    Integer totalImpressions = jobMetricsService.getTotalImpressions(jobPostId);
    ResponseImpressionsDto responseDto = ResponseImpressionsDto.builder()
        .impressionsCount(totalImpressions)
        .build();
    return new ResponseEntity<>(responseDto, HttpStatus.OK);
  }

  @PreAuthorize("hasAuthority('EMPLOYER')")
  @GetMapping("/impressions/employer/total")
  public ResponseEntity<ResponseImpressionsDto> getTotalImpressionsForEmployer() {
    Long employerId = parsedUserId();
    Integer totalImpressions = jobMetricsService.getTotalEmployerImpressions(employerId);
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
    Integer totalImpressions = jobMetricsService.getEmployerImpressionsByDateRange(employerId, startDate, endDate).size();
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
    Integer impressionCount = jobMetricsService.getEmployerImpressionsBeforeDate(employerId, beforeDate);
    ResponseImpressionsDto responseDto = ResponseImpressionsDto.builder()
        .impressionsCount(impressionCount)
        .build();
    return new ResponseEntity<>(responseDto, HttpStatus.OK);
  }

  @PreAuthorize("hasAuthority('EMPLOYER')")
  @GetMapping("/impressions/chart")
  public ResponseEntity<List<ImpressionEventDto>> getImpressionDataForChart() {
    Long employerId = parsedUserId();
    List<ImpressionEventDto> chartData = jobMetricsService.getImpressionDataForChart(employerId);
    return ResponseEntity.ok(chartData);
  }

  private ResponseImpressionsDto convertToDto(Integer impressionCount) {
        return ResponseImpressionsDto.builder()
                .impressionsCount(impressionCount)
                .build();
    }


}


