package com.example.jobjays.service;

public class OwnershipService {
  private final JobMetricsService jobMetricsService;
  private final JobPostService jobPostService;

  public OwnershipService(JobMetricsService jobMetricsService, JobPostService jobPostService) {
    this.jobMetricsService = jobMetricsService;
    this.jobPostService = jobPostService;
  }

  public boolean isJobPostOwner(Long jobPostId, Long userId) {
    return jobPostService.getJobPostById(jobPostId).getEmployer().getID().equals(userId);
  }
}
