package com.example.jobjays.controller;

import com.example.jobjays.authentication.TokenGenerator;
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
import com.example.jobjays.wrapper.EmailSendWrapper;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applicants")
public class ApplicantController {

  private final ApplicantService applicantService;
  private final ResponseMapperService responseMapperService;

  // Define the email pattern
  private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
  private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

  @Autowired
  private EmailSendWrapper emailSendWrapper;


  public ApplicantController(ApplicantService applicantService, ResponseMapperService responseMapperService) {
    this.applicantService = applicantService;
    this.responseMapperService = responseMapperService;
  }

  // Method to validate email
  public boolean isValidEmail(String email) {
    if (email == null) {
      return false;
    }
    Matcher matcher = EMAIL_PATTERN.matcher(email);
    return matcher.matches();
  }

  @GetMapping("/verify")
  public String verifyUser(@RequestParam("token") String token) {
    //User user = applicantService.findByVerificationToken(token);
//
//    if (user == null) {
//      return "Invalid token!";
//    }
//
//    user.setEnabled(true); // Enable the user
//    user.setVerificationToken(null); // Clear the token
//    userRepository.save(user);

    return "Email verified successfully! You can now log in.";
  }

  @PostMapping
  public ResponseEntity<ResponseApplicantDto> addApplicant(@RequestBody CreateApplicantDto createApplicantDto) {
    //check the email formation
    if(!isValidEmail(createApplicantDto.getEmail())) {
      throw new ServiceException("Email format is wrong");
    }

    createApplicantDto.setEnabled(false);
    String token = TokenGenerator.generateToken();
    createApplicantDto.setVerificationToken(token);
    createApplicantDto.setEnabled(false); // User is disabled until they verify

    Applicant applicant = applicantService.addApplicant(createApplicantDto);
    emailSendWrapper.sendVerificationEmail(applicant.getEmail(), token);
    ResponseApplicantDto responseApplicantDto = mapToResponseApplicantDto(applicant);
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
