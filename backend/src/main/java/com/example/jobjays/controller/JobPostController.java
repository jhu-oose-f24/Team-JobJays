package com.example.jobjays.controller;

import com.example.jobjays.dto.jobPost.CreateJobPostDto;
import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import com.example.jobjays.dto.jobPost.UpdateJobPostDto;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.service.JobPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobposts")
public class JobPostController {

  private final JobPostService jobPostService;

  public JobPostController(JobPostService jobPostService) {
    this.jobPostService = jobPostService;
  }

  @PostMapping("/add")
  public ResponseEntity<ResponseJobPostDto> addJobPost(@RequestBody CreateJobPostDto newJobPost) {
    JobPost jobPost = jobPostService.addJobPost(newJobPost);
    return new ResponseEntity<>(mapToResponseDto(jobPost), HttpStatus.CREATED);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<ResponseJobPostDto> updateJobPost(@PathVariable Long id, @RequestBody UpdateJobPostDto updateJobPostDto) {
    JobPost updatedJobPost = jobPostService.updateJobPost(updateJobPostDto, id);
    if (updatedJobPost == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseDto(updatedJobPost));
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Void> deleteJobPost(@PathVariable Long id) {
    jobPostService.deleteJobPost(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/all")
  public ResponseEntity<List<ResponseJobPostDto>> getJobPosts() {
    List<JobPost> jobPosts = jobPostService.getJobPosts();
    List<ResponseJobPostDto> responseJobPosts = jobPosts.stream()
        .map(this::mapToResponseDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseJobPosts);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ResponseJobPostDto> getJobPostById(@PathVariable Long id) {
    JobPost jobPost = jobPostService.getJobPostById(id);
    if (jobPost == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseDto(jobPost));
  }

  @GetMapping("/employer/{employerName}")
  public ResponseEntity<List<ResponseJobPostDto>> getJobPostsByEmployer(@PathVariable String employerName) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByEmployer(employerName);
    List<ResponseJobPostDto> responseJobPosts = jobPosts.stream()
        .map(this::mapToResponseDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseJobPosts);
  }

  @GetMapping("/title/{title}")
  public ResponseEntity<List<ResponseJobPostDto>> getJobPostsByTitle(@PathVariable String title) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByTitle(title);
    List<ResponseJobPostDto> responseJobPosts = jobPosts.stream()
        .map(this::mapToResponseDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseJobPosts);
  }

  @GetMapping("/title/contains/{title}")
  public ResponseEntity<List<ResponseJobPostDto>> getJobPostsByTitleContaining(@PathVariable String title) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByTitleContaining(title);
    List<ResponseJobPostDto> responseJobPosts = jobPosts.stream()
        .map(this::mapToResponseDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseJobPosts);
  }

  // Helper method to map JobPost to ResponseJobPostDto
  private ResponseJobPostDto mapToResponseDto(JobPost jobPost) {
    ResponseJobPostDto responseJobPostDto = new ResponseJobPostDto();
    responseJobPostDto.id = jobPost.getID();
    responseJobPostDto.title = jobPost.getTitle();
    responseJobPostDto.description = jobPost.getDescription();
    responseJobPostDto.location = jobPost.getLocation();
    responseJobPostDto.salary = jobPost.getSalary();
    responseJobPostDto.postedDate = jobPost.getPostedDate(); // Assuming this exists in JobPost
    responseJobPostDto.closedDate = jobPost.getClosedDate();
    return responseJobPostDto;
  }
}
