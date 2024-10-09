package com.example.jobjays.controller;

import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import com.example.jobjays.dto.profile.ResponseApplicantProfileDto;
import com.example.jobjays.dto.profile.ResponseProfileDto;
import com.example.jobjays.dto.applicant.CreateApplicantDto;
import com.example.jobjays.dto.applicant.ResponseApplicantDto;
import com.example.jobjays.dto.applicant.UpdateApplicantDto;
import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.ApplicantProfile;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.service.ApplicantService;
import com.example.jobjays.service.ResponseMapperService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applicants")
public class ApplicantController {

  private final ApplicantService applicantService;
  private final ResponseMapperService responseMapperService;

  public ApplicantController(ApplicantService applicantService, ResponseMapperService responseMapperService) {
    this.applicantService = applicantService;
    this.responseMapperService = responseMapperService;
  }

  @PostMapping
  public ResponseEntity<ResponseApplicantDto> addApplicant(@RequestBody CreateApplicantDto createApplicantDto) {
    Applicant applicant = applicantService.addApplicant(createApplicantDto);
    //return ResponseEntity.ok(mapToResponseApplicantDto(applicant));
    ResponseApplicantDto responseApplicantDto = mapToResponseApplicantDto(applicant);
//    HttpHeaders headers = new HttpHeaders();
//    headers.setLocation(URI.create("http://localhost:8080/api/applicants/profile/" + applicant.getID()));
    return new ResponseEntity<>(responseApplicantDto, HttpStatus.CREATED);
  }

  @PutMapping("/profile/{id}")
  public ResponseEntity<ResponseApplicantDto> updateApplicant(@RequestBody UpdateApplicantDto updateApplicantDto, @PathVariable Long id) {
    Applicant updatedApplicant = applicantService.updateApplicant(updateApplicantDto, id);
    if (updatedApplicant == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseApplicantDto(updatedApplicant));
  }

  @DeleteMapping("/profile/{id}")
  public ResponseEntity<Void> deleteApplicant(@PathVariable Long id) {
    applicantService.deleteApplicant(id);
    return ResponseEntity.noContent().build();
  }

//  @GetMapping("/profile/{id}")
//  public ResponseEntity<ResponseApplicantDto> getApplicantById(@PathVariable Long id) {
//    Applicant applicant = applicantService.findApplicantById(id);
//    if (applicant == null) {
//      return ResponseEntity.notFound().build();
//    }
//    return ResponseEntity.ok(mapToResponseApplicantDto(applicant));
//  }

  @GetMapping
  public ResponseEntity<List<ResponseApplicantDto>> getAllApplicants() {
    List<Applicant> applicants = applicantService.findAllApplicants();
    List<ResponseApplicantDto> responseList = applicants.stream()
        .map(this::mapToResponseApplicantDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseList);
  }

  @GetMapping("/profile/{id}")
  public ResponseEntity<ResponseProfileDto> getApplicantProfileById(@PathVariable Long id) {
    ApplicantProfile applicantProfile = applicantService.findApplicantProfileById(id);
    if (applicantProfile == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseProfileDto(applicantProfile));
  }

  @GetMapping("/profile/search/username")
  public ResponseEntity<ResponseApplicantProfileDto> getApplicantProfileByUsername(@RequestParam("username") String username) {
    ApplicantProfile applicantProfile = applicantService.findApplicantProfileByUsername(username);
    if (applicantProfile == null) {
      return ResponseEntity.notFound().build();
    }

    ResponseApplicantProfileDto responseApplicantProfileDto = mapToResponseProfileDto(applicantProfile);
//    HttpHeaders headers = new HttpHeaders();
//    headers.setLocation(URI.create("http://localhost:8080/api/applicants/profile/" + applicantProfile.getUser().getID()));
    return new ResponseEntity<>(responseApplicantProfileDto, HttpStatus.OK);
  }

//  @GetMapping("/profile/search/username")
//  public ResponseEntity<List<ResponseApplicantDto>> getApplicantsByUsername(@RequestParam("username") String username) {
//    List<Applicant> applicants = applicantService.findApplicantsByUsername(username);
//    List<ResponseApplicantDto> responseList = applicants.stream()
//        .map(this::mapToResponseApplicantDto)
//        .collect(Collectors.toList());
//    return ResponseEntity.ok(responseList);
//  }

  @GetMapping("/profile/search/name")
  public ResponseEntity<List<ResponseProfileDto>> getApplicantsByName(@RequestParam("name") String name) {
    List<ApplicantProfile> profiles = applicantService.findApplicantProfilesByUsername(name);
    List<ResponseProfileDto> responseList = profiles.stream()
        .map(this::mapToResponseProfileDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseList);
  }
  

  //@GetMapping("/profile/apply/{jobId}")
  //TODO: create a job application endpoint

  //TODO: refactor into class
  public ResponseJobPostDto mapToResponseJobPostDto(JobPost jobPost) {
    ResponseJobPostDto responseJobPostDto = new ResponseJobPostDto();
    responseJobPostDto.id = jobPost.getID();
    responseJobPostDto.setCompanyName(jobPost.getEmployer().getProfile().getName());
    responseJobPostDto.title = jobPost.getTitle();
    responseJobPostDto.description = jobPost.getDescription();
    responseJobPostDto.location = jobPost.getLocation();
    responseJobPostDto.minSalary = jobPost.getMinSalary();
    responseJobPostDto.maxSalary = jobPost.getMaxSalary();
    responseJobPostDto.postedDate = jobPost.getPostedDate();
    responseJobPostDto.closedDate = jobPost.getClosedDate();
    responseJobPostDto.numApplicants = jobPost.getApplicants().size();
    return responseJobPostDto;
  }

   ResponseApplicantProfileDto mapToResponseProfileDto(ApplicantProfile profile) {
    ResponseApplicantProfileDto responseProfileDto = new ResponseApplicantProfileDto();
    responseProfileDto.name = profile.getName();
    responseProfileDto.bio = profile.getBio();
    responseProfileDto.appliedJobs = profile.getAppliedJobs().stream().map(this::mapToResponseJobPostDto).collect(Collectors.toList());;
    return responseProfileDto;
  }

  // Utility method to map Applicant entity to ResponseApplicantDto
  private ResponseApplicantDto mapToResponseApplicantDto(Applicant applicant) {
    ResponseApplicantDto responseApplicantDto = new ResponseApplicantDto();
    responseApplicantDto.applicantId = applicant.getID();
    responseApplicantDto.username = applicant.getUsername();
    responseApplicantDto.applicantProfile = mapToResponseProfileDto(applicant.getProfile());
    return responseApplicantDto;
  }
}
