package com.example.jobjays.controller;

import com.example.jobjays.dto.ResponseApplicantProfileDto;
import com.example.jobjays.dto.ResponseProfileDto;
import com.example.jobjays.dto.applicant.CreateApplicantDto;
import com.example.jobjays.dto.applicant.ResponseApplicantDto;
import com.example.jobjays.dto.applicant.UpdateApplicantDto;
import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.ApplicantProfile;
import com.example.jobjays.service.ApplicantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applicants")
public class ApplicantController {

  private final ApplicantService applicantService;

  public ApplicantController(ApplicantService applicantService) {
    this.applicantService = applicantService;
  }

  @PostMapping("/add")
  public ResponseEntity<ResponseApplicantDto> addApplicant(@RequestBody CreateApplicantDto createApplicantDto) {
    Applicant applicant = applicantService.addApplicant(createApplicantDto);
    return ResponseEntity.ok(mapToResponseApplicantDto(applicant));
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<ResponseApplicantDto> updateApplicant(@RequestBody UpdateApplicantDto updateApplicantDto, @PathVariable Long id) {
    Applicant updatedApplicant = applicantService.updateApplicant(updateApplicantDto, id);
    if (updatedApplicant == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseApplicantDto(updatedApplicant));
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Void> deleteApplicant(@PathVariable Long id) {
    applicantService.deleteApplicant(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<ResponseApplicantDto> getApplicantById(@PathVariable Long id) {
    Applicant applicant = applicantService.findApplicantById(id);
    if (applicant == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseApplicantDto(applicant));
  }

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

  @GetMapping("/username/{username}")
  public ResponseEntity<ResponseApplicantDto> getApplicantByUsername(@PathVariable String username) {
    Applicant applicant = applicantService.findApplicantByUsername(username);
    if (applicant == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseApplicantDto(applicant));
  }

  @GetMapping("/username/fuzzy/{username}")
  public ResponseEntity<List<ResponseApplicantDto>> getApplicantsByUsernameFuzzy(@PathVariable String username) {
    List<Applicant> applicants = applicantService.findApplicantsByUsernameFuzzy(username);
    List<ResponseApplicantDto> responseList = applicants.stream()
        .map(this::mapToResponseApplicantDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseList);
  }

  @GetMapping("/email/fuzzy/{email}")
  public ResponseEntity<List<ResponseApplicantDto>> getApplicantsByEmailFuzzy(@PathVariable String email) {
    List<Applicant> applicants = applicantService.findApplicantsByEmailFuzzy(email);
    List<ResponseApplicantDto> responseList = applicants.stream()
        .map(this::mapToResponseApplicantDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseList);
  }

  //@GetMapping("/profile/apply/{jobId}")
  //TODO: create a job application endpoint

  private ResponseApplicantProfileDto mapToResponseProfileDto(ApplicantProfile profile) {
    ResponseApplicantProfileDto responseProfileDto = new ResponseApplicantProfileDto();
    responseProfileDto.name = profile.getName();
    responseProfileDto.bio = profile.getBio();
    responseProfileDto.appliedJobs = profile.getAppliedJobs();
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
