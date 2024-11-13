package com.example.jobjays.controller;

import com.example.jobjays.auth.CustomAuthenticationDetails;
import com.example.jobjays.authentication.LoginRequired;
import com.example.jobjays.dto.applicant.ResponseApplicantDto;
import com.example.jobjays.dto.jobPost.CreateJobPostDto;
import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import com.example.jobjays.dto.jobPost.UpdateJobPostDto;
import com.example.jobjays.dto.profile.ResponseApplicantProfileDto;
import com.example.jobjays.model.*;
import com.example.jobjays.service.ApplicantService;
import com.example.jobjays.service.EmployerService;
import com.example.jobjays.service.JobPostService;
import com.example.jobjays.service.ResponseMapperService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class JobPostController {

  private final JobPostService jobPostService;
  private final EmployerService employerService;
  private final ApplicantService applicantService;
  private final ResponseMapperService responseMapperService;

  public JobPostController(JobPostService jobPostService,
                           EmployerService employerService,
                           ResponseMapperService responseMapperService,
                           ApplicantService applicantService
  ) {
    this.jobPostService = jobPostService;
    this.employerService = employerService;
    this.applicantService = applicantService;
    this.responseMapperService = responseMapperService;
  }

  private String getCurrentUserId() {
    CustomAuthenticationDetails details = (CustomAuthenticationDetails)
        SecurityContextHolder.getContext().getAuthentication().getDetails();
    return details != null ? details.getUserId() : null;
  }

  private Long parsedUserId() {
    String userId = getCurrentUserId();
    if (userId == null) {
      return null; // Prevents access to another user's data
    }
    return Long.parseLong(userId);
  }

  @PostMapping("/companies/profile/post")
  public ResponseEntity<ResponseJobPostDto> addJobPost(@Valid @RequestBody CreateJobPostDto newJobPost) {
    Long employerId = parsedUserId();
    Employer employer = employerService.findEmployerById(employerId);
    if (employer == null) {
      return ResponseEntity.notFound().build();
    }
    // set industry from employer data
    System.out.println(newJobPost.getSkillsRequired());
    newJobPost.setIndustry(employer.getProfile().getIndustry());
    JobPost jobPost = jobPostService.addJobPost(newJobPost, employer);
    ResponseJobPostDto responseJobPostDto = responseMapperService.mapToResponseJobPostDto(jobPost);


    return new ResponseEntity<>(responseJobPostDto, HttpStatus.CREATED);
  }

  @PutMapping("/companies/profile/post/{id}")
  public ResponseEntity<?> updateJobPost(@PathVariable Long id, @RequestBody UpdateJobPostDto updateJobPostDto) {
    //find employer
    Long employerId = parsedUserId();
    ResponseEntity<?> build = checkOwnership(id, employerId);
    if (build != null) return build;
    JobPost updatedJobPost = jobPostService.updateJobPost(updateJobPostDto, id);
    return ResponseEntity.ok(responseMapperService.mapToResponseJobPostDto(updatedJobPost));
  }

  /*
    * Helper method to check if post belongs to employer
   */
  private ResponseEntity<?> checkOwnership(Long id, Long employerId) {
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

  @DeleteMapping("/companies/profile/post/{id}")
  public ResponseEntity<?> deleteJobPost(@PathVariable Long id) {
    Long employerId = parsedUserId();
    //find employer
    ResponseEntity<?> build = checkOwnership(id, employerId);
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

  @GetMapping("/companies/profile/jobs")
  public ResponseEntity<List<ResponseJobPostDto>> getJobPostsByEmployerId() {
    Long employerId = parsedUserId();
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

  @GetMapping("/{jobID}/applicants")
  public ResponseEntity<Set<ResponseApplicantDto>> getApplicants(@PathVariable Long jobID) {
    Set<Applicant> applicants = jobPostService.getApplicantsByJobPostId(jobID);
    Set<ResponseApplicantDto> responseApplicants = applicants.stream()
        .map(this::mapToResponseApplicantDto)
        .collect(Collectors.toSet());
    return ResponseEntity.ok(responseApplicants);
  }

  @PutMapping("/apply/{jobID}/{applicantId}")
  public ResponseEntity<ResponseJobPostDto> applyForJob(@PathVariable Long jobID, @PathVariable Long applicantId) {
    JobPost jobPost = jobPostService.getJobPostById(jobID);
    Applicant applicant = applicantService.findApplicantById(applicantId);
    if (jobPost == null || applicant == null) {
      return ResponseEntity.badRequest().build();
    }
    JobPost updatedJobPost = jobPostService.addApplicantToJobPost(jobPost, applicant);
    //return ResponseEntity.ok(responseMapperService.mapToResponseJobPostDto(updatedJobPost));
    return ResponseEntity.ok().build();

  }


  ResponseApplicantProfileDto mapToResponseProfileDto(ApplicantProfile profile) {
    ResponseApplicantProfileDto responseProfileDto = new ResponseApplicantProfileDto();
    responseProfileDto.name = profile.getName();
    responseProfileDto.bio = profile.getBio();
    //responseProfileDto.appliedJobs = profile.getAppliedJobs().stream().map(responseMapperService::mapToResponseJobPostDto).collect(Collectors.toList());;
    return responseProfileDto;
  }

  // Utility method to map Applicant entity to ResponseApplicantDto
  private ResponseApplicantDto mapToResponseApplicantDto(Applicant applicant) {
    ResponseApplicantDto responseApplicantDto = ResponseApplicantDto.builder().build();
    responseApplicantDto.applicantId = applicant.getID();
    responseApplicantDto.username = applicant.getUsername();
    responseApplicantDto.applicantProfile = mapToResponseProfileDto(applicant.getProfile());
    return responseApplicantDto;
  }

}
