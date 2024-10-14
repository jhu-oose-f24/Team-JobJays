package com.example.jobjays.controller;

import com.example.jobjays.dto.jobPost.CreateJobPostDto;
import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import com.example.jobjays.dto.jobPost.UpdateJobPostDto;
import com.example.jobjays.model.Employer;
import com.example.jobjays.model.EmployerProfile;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.service.EmployerService;
import com.example.jobjays.service.JobPostService;
import org.apache.coyote.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class JobPostController {

  private final JobPostService jobPostService;
  private final EmployerService employerService;

  public JobPostController(JobPostService jobPostService, EmployerService employerService) {
    this.jobPostService = jobPostService;
    this.employerService = employerService;
  }

  @PostMapping("/companies/profile/{employerId}/post")
  public ResponseEntity<ResponseJobPostDto> addJobPost(@RequestBody CreateJobPostDto newJobPost, @PathVariable Long employerId) {
    Employer employer = employerService.findEmployerById(employerId);
    if (employer == null) {
      return ResponseEntity.notFound().build();
    }
    JobPost jobPost = jobPostService.addJobPost(newJobPost, employer);
    ResponseJobPostDto responseJobPostDto = mapToResponseDto(jobPost);
    //HttpHeaders headers = new HttpHeaders();
    //headers.setLocation(URI.create("http://localhost:8080/api/companies/profile/" + employerId + "/post/" + jobPost.getID()));
    return new ResponseEntity<>(responseJobPostDto, HttpStatus.CREATED);
  }

  @PutMapping("/companies/profile/{employerId}/post/{id}")
  public ResponseEntity<ResponseJobPostDto> updateJobPost(@PathVariable Long id, @RequestBody UpdateJobPostDto updateJobPostDto, @PathVariable Long employerId) {
    //find employer
    EmployerProfile employer = employerService.findEmployerById(employerId).getProfile();
    //find post
    JobPost jobPost = jobPostService.getJobPostById(id);
    if (jobPost == null) {
      return ResponseEntity.notFound().build();
    }
    //check if post belongs to employer
    if (!jobPost.getEmployer().getProfile().equals(employer)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    JobPost updatedJobPost = jobPostService.updateJobPost(updateJobPostDto, id);
    return ResponseEntity.ok(mapToResponseDto(updatedJobPost));
  }

  @DeleteMapping("/companies/profile/{employerId}/post/{id}")
  public ResponseEntity<Void> deleteJobPost(@PathVariable Long id, @PathVariable Long employerId) {
    //find employer
    EmployerProfile employer = employerService.findEmployerById(employerId).getProfile();
    //find post
    JobPost jobPost = jobPostService.getJobPostById(id);
    if (jobPost == null) {
      return ResponseEntity.notFound().build();
    }
    //check if post belongs to employer
    if (!jobPost.getEmployer().getProfile().equals(employer)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    jobPostService.deleteJobPost(id);
    return ResponseEntity.noContent().build();
  }


  @GetMapping("/posts/jobs")
  public ResponseEntity<List<ResponseJobPostDto>> getJobPosts() {
    List<JobPost> jobPosts = jobPostService.getJobPosts();
    List<ResponseJobPostDto> responseJobPosts = jobPosts.stream()
        .map(this::mapToResponseDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseJobPosts);
  }

  @GetMapping("/posts/jobs/{id}")
  public ResponseEntity<ResponseJobPostDto> getJobPostById(@PathVariable Long id) {
    JobPost jobPost = jobPostService.getJobPostById(id);
    if (jobPost == null) {
      return ResponseEntity.notFound().build();
    }
    ResponseJobPostDto responseJobPostDto = mapToResponseDto(jobPost);
    //HttpHeaders headers = new HttpHeaders();
    //Long employerId = jobPost.getEmployer().getID();
    //headers.setLocation(URI.create("http://localhost:8080/api/companies/profile/" + employerId + "/post/" + jobPost.getID()));
    return new ResponseEntity<>(responseJobPostDto, HttpStatus.OK);
  }

  @GetMapping("/search/posts/jobs/company")
  public ResponseEntity<List<ResponseJobPostDto>> getJobPostsByEmployer(@RequestParam("company") String employerName) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByEmployer(employerName);
    List<ResponseJobPostDto> responseJobPosts = jobPosts.stream()
        .map(this::mapToResponseDto)
        .collect(Collectors.toList());

//    HttpHeaders headers = new HttpHeaders();
//    Employer employer = employerService.findEmployerByUsername(employerName);
//    headers.setLocation(URI.create("http://localhost:8080/api/companies/profile/" + employer.getID()));

    //return ResponseEntity.ok(responseJobPosts);
    return new ResponseEntity<>(responseJobPosts, HttpStatus.OK);
  }

//  @GetMapping("/search/posts/jobs/title")
//  public ResponseEntity<List<ResponseJobPostDto>> getJobPostsByTitle(@RequestParam("title") String title) {
//    List<JobPost> jobPosts = jobPostService.getJobPostsByTitle(title);
//    List<ResponseJobPostDto> responseJobPosts = jobPosts.stream()
//        .map(this::mapToResponseDto)
//        .collect(Collectors.toList());
//    return ResponseEntity.ok(responseJobPosts);
//  }

  @GetMapping("/search/posts/jobs/title")
  public ResponseEntity<List<ResponseJobPostDto>> getJobPostsByTitleContaining(@RequestParam String title) {
    List<JobPost> jobPosts = jobPostService.getJobPostsByTitleContaining(title);
    List<ResponseJobPostDto> responseJobPosts = jobPosts.stream()
        .map(this::mapToResponseDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseJobPosts);
  }

  // Helper method to map JobPost to ResponseJobPostDto
  public ResponseJobPostDto mapToResponseDto(JobPost jobPost) {
    ResponseJobPostDto responseJobPostDto = new ResponseJobPostDto();
    responseJobPostDto.id = jobPost.getID();
    responseJobPostDto.setCompanyName(jobPost.getEmployer().getProfile().getName());
    responseJobPostDto.title = jobPost.getTitle();
    responseJobPostDto.description = jobPost.getDescription();
    responseJobPostDto.location = jobPost.getLocation();
    responseJobPostDto.salary = jobPost.getSalary();
    responseJobPostDto.postedDate = jobPost.getPostedDate(); // Assuming this exists in JobPost
    responseJobPostDto.closedDate = jobPost.getClosedDate();
    responseJobPostDto.numApplicants = jobPost.getApplicants().size();
    return responseJobPostDto;
  }
}
