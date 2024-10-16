package com.example.jobjays.controller;

import com.example.jobjays.authentication.LoginRequired;
import com.example.jobjays.dto.jobPost.CreateJobPostDto;
import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import com.example.jobjays.dto.jobPost.UpdateJobPostDto;
import com.example.jobjays.model.Employer;
import com.example.jobjays.model.EmployerProfile;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.service.EmployerService;
import com.example.jobjays.service.JobPostService;
import com.example.jobjays.service.ResponseMapperService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class JobPostController {

  private final JobPostService jobPostService;
  private final EmployerService employerService;
  private final ResponseMapperService responseMapperService;

  public JobPostController(JobPostService jobPostService, EmployerService employerService, ResponseMapperService responseMapperService) {
    this.jobPostService = jobPostService;
    this.employerService = employerService;
    this.responseMapperService = responseMapperService;
  }



  @PostMapping("/companies/profile/{employerId}/post")
  @LoginRequired
  public ResponseEntity<ResponseJobPostDto> addJobPost(@Valid @RequestBody CreateJobPostDto newJobPost, @PathVariable Long employerId) {
    Employer employer = employerService.findEmployerById(employerId);
    if (employer == null) {
      return ResponseEntity.notFound().build();
    }
    JobPost jobPost = jobPostService.addJobPost(newJobPost, employer);
    ResponseJobPostDto responseJobPostDto = responseMapperService.mapToResponseJobPostDto(jobPost);


    return new ResponseEntity<>(responseJobPostDto, HttpStatus.CREATED);
  }

  @PutMapping("/companies/profile/{employerId}/post/{id}")
  public ResponseEntity<ResponseJobPostDto> updateJobPost(@PathVariable Long id, @RequestBody UpdateJobPostDto updateJobPostDto, @PathVariable Long employerId) {
    //find employer
    ResponseEntity<ResponseJobPostDto> build = checkOwnership(id, employerId);
    if (build != null) return build;
    JobPost updatedJobPost = jobPostService.updateJobPost(updateJobPostDto, id);
    return ResponseEntity.ok(responseMapperService.mapToResponseJobPostDto(updatedJobPost));
  }

  /*
    * Helper method to check if post belongs to employer
   */
  private ResponseEntity<ResponseJobPostDto> checkOwnership(Long id, Long employerId) {
    EmployerProfile employer = employerService.findEmployerById(employerId).getProfile();
    ResponseEntity<ResponseJobPostDto> build = new ResponseEntity<>(HttpStatus.NOT_FOUND);
    if (employer == null) {
      return build;
    }
    //find post
    JobPost jobPost = jobPostService.getJobPostById(id);
    if (jobPost == null) {
      return build;
    }
    //check if post belongs to employer
    if (!jobPost.getEmployer().getProfile().equals(employer)) {
      build = ResponseEntity.status(HttpStatus.FORBIDDEN).build();
      return build;
    }
    //return null if post belongs to employer
    return null;
  }

  @DeleteMapping("/companies/profile/{employerId}/post/{id}")
  public ResponseEntity<ResponseJobPostDto> deleteJobPost(@PathVariable Long id, @PathVariable Long employerId) {
    //find employer
    ResponseEntity<ResponseJobPostDto> build = checkOwnership(id, employerId);
    if (build != null) return build;
    jobPostService.deleteJobPost(id);
    return ResponseEntity.noContent().build();
  }


  @GetMapping("/posts/jobs")
  public ResponseEntity<List<ResponseJobPostDto>> getJobPosts() {
    List<JobPost> jobPosts = jobPostService.getJobPosts();
    List<ResponseJobPostDto> responseJobPosts = jobPosts.stream()
        .map(responseMapperService::mapToResponseJobPostDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseJobPosts);
  }

  @GetMapping("/posts/jobs/{id}")
  public ResponseEntity<ResponseJobPostDto> getJobPostById(@PathVariable Long id) {
    JobPost jobPost = jobPostService.getJobPostById(id);
    if (jobPost == null) {
      return ResponseEntity.notFound().build();
    }
    ResponseJobPostDto responseJobPostDto = responseMapperService.mapToResponseJobPostDto(jobPost);

    return new ResponseEntity<>(responseJobPostDto, HttpStatus.OK);
  }

  @GetMapping("/search/posts/jobs/company")
  public ResponseEntity<List<ResponseJobPostDto>> getJobPostsByEmployer(@RequestParam("company") String employerName) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByEmployer(employerName);
    List<ResponseJobPostDto> responseJobPosts = jobPosts.stream()
        .map(responseMapperService::mapToResponseJobPostDto)
        .collect(Collectors.toList());


    return new ResponseEntity<>(responseJobPosts, HttpStatus.OK);
  }

  @GetMapping("/companies/profile/{employerId}/jobs")
  public ResponseEntity<List<ResponseJobPostDto>> getJobPostsByEmployerId(@PathVariable Long employerId) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByEmployerId(employerId);
    List<ResponseJobPostDto> responseJobPosts = jobPosts.stream()
        .map(responseMapperService::mapToResponseJobPostDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseJobPosts);
  }


  @GetMapping("/search/posts/jobs/title")
  public ResponseEntity<List<ResponseJobPostDto>> getJobPostsByTitleContaining(@RequestParam String title) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByTitleContaining(title);
    List<ResponseJobPostDto> responseJobPosts = jobPosts.stream()
        .map(responseMapperService::mapToResponseJobPostDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseJobPosts);
  }

}
