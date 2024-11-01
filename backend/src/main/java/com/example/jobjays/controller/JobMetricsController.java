package com.example.jobjays.controller;

import com.example.jobjays.dto.ResponseImpressionsDto;
import com.example.jobjays.model.ImpressionEvent;
import com.example.jobjays.model.Impressions;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.service.JobMetricsService;
import com.example.jobjays.service.JobPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/metrics")
public class JobMetricsController {
    // This class will handle job metrics related endpoints
    // Add methods to handle various metrics related to job posts, impressions, etc.
    private final JobMetricsService jobMetricsService;
    private final JobPostService jobPostService;

    public JobMetricsController(JobMetricsService jobMetricsService, JobPostService jobPostService) {
        this.jobMetricsService = jobMetricsService;
        this.jobPostService = jobPostService;
    }

     @GetMapping("/impressions/{jobPostId}")
     public ResponseEntity<Integer> getJobImpressionsCount(@PathVariable Long jobPostId) {
         Integer totalImpressions = jobMetricsService.getTotalImpressions(jobPostId);
         return new ResponseEntity<>(totalImpressions, HttpStatus.OK);
     }

     @PostMapping("/impressions/{jobPostId}")
     public ResponseEntity<Void> addImpressionEvent(@PathVariable Long jobPostId) {
        JobPost jobPost = jobPostService.getJobPostById(jobPostId);
        if (jobPost == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        jobMetricsService.addImpressionEvent(jobPost);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/impressions/{jobPostId}/range")
    public ResponseEntity<Integer> getImpressionsByDateRange(
            @PathVariable Long jobPostId,
            @RequestParam("start") String start,
            @RequestParam("end") String end) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        Integer totalImpressions = jobMetricsService.getImpressionsByDateRange(jobPostId, startDate, endDate).size();

        return new ResponseEntity<>(totalImpressions, HttpStatus.OK);
    }

    @GetMapping("/impressions/{jobPostId}/before")
    public ResponseEntity<Integer> getImpressionsBeforeDate(
            @PathVariable Long jobPostId,
            @RequestParam("date") String date) {
        LocalDateTime beforeDate = LocalDateTime.parse(date);
        Integer impressionCount = jobMetricsService.getImpressionsBeforeDate(jobPostId, beforeDate);
        return new ResponseEntity<>(impressionCount, HttpStatus.OK);
    }

    private ResponseImpressionsDto convertToDto(Integer impressionCount) {
        return ResponseImpressionsDto.builder()
                .impressionsCount(impressionCount)
                .build();
    }
}


