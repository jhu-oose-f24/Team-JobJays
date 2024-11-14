package com.example.jobjays.controller;

import com.example.jobjays.auth.AuthService;
import com.example.jobjays.auth.CustomAuthenticationDetails;
import com.example.jobjays.auth.JwtTokenProvider;
import com.example.jobjays.authentication.TokenGenerator;
import com.example.jobjays.dto.applicant.UpdateApplicantDto;
import com.example.jobjays.dto.profile.ResponseEmployerProfileDto;
import com.example.jobjays.dto.profile.ResponseProfileDto;
import com.example.jobjays.dto.employer.CreateEmployerDto;
import com.example.jobjays.dto.employer.ResponseEmployerDto;
import com.example.jobjays.dto.employer.UpdateEmployerDto;
import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.Employer;
import com.example.jobjays.model.EmployerProfile;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.service.EmployerService;
import com.example.jobjays.service.ResponseMapperService;
import com.example.jobjays.wrapper.EmailSendWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/companies")
public class EmployerController {

  private final EmployerService employerService;
  private final ResponseMapperService responseMapperService;
  private final AuthService authService;



  @Autowired
  private EmailSendWrapper emailSendWrapper;

  public EmployerController(EmployerService employerService, ResponseMapperService responseMapperService, AuthService authService) {
    this.employerService = employerService;
    this.responseMapperService = responseMapperService;
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
      return null; // Prevents access to another user's data
    }
    return Long.parseLong(userId);
  }

  @GetMapping("/verify")
  public RedirectView verifyUser(@RequestParam("token") String token) {
    String username = authService.extractUsername(token);
    Employer employer = employerService.findEmployerByUsername(username);
    UpdateEmployerDto user = new UpdateEmployerDto();

    if (employer == null) {
      return  new RedirectView("http://localhost:3000/invalid-token");
    }

    user.setEnabled(true); // Enable the user
    user.setToken(null); // Clear the token
    employerService.updateEmployer(user,employer.getID());

    RedirectView redirectView = new RedirectView("http://localhost:3000/signin");
    redirectView.setExposeModelAttributes(false);

    return redirectView;
  }

  //THE SAME AS REGISTERING
  @PostMapping("/register")
  public ResponseEntity<ResponseEmployerDto> addEmployer(@RequestBody CreateEmployerDto createEmployerDto) {
    createEmployerDto.setEnabled(false);
    String token = authService.getEmployerEnablementToken(createEmployerDto);
    createEmployerDto.setEnabled(false); // User is disabled until they verify

    Employer employer = employerService.addEmployer(createEmployerDto);
    emailSendWrapper.sendVerificationEmailForEmployer(employer.getEmail(), token);
    ResponseEmployerDto responseEmployerDto = mapToResponseEmployerDto(employer);
    return new ResponseEntity<>(responseEmployerDto, HttpStatus.CREATED);
  }

  //REQUIRES USER TO BE SIGNED
  //REQUIRES USER TO BE OWNER OF THE PROFILE
  @PutMapping("/profile")
  public ResponseEntity<ResponseEmployerDto> updateEmployer(@RequestBody UpdateEmployerDto updateEmployerDto) {
    Long userId = parsedUserId();
    Employer updatedEmployer = employerService.updateEmployer(updateEmployerDto, userId);
    if (updatedEmployer == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseEmployerDto(updatedEmployer));
  }

  //REQUIRES USER TO BE SIGNED
  //REQUIRES USER TO BE OWNER OF THE PROFILE
  @DeleteMapping("/profile")
  public ResponseEntity<Void> deleteEmployer() {
    Long userId = parsedUserId();
    employerService.deleteEmployer(userId);
    return ResponseEntity.noContent().build();
  }

  //REQUIRES USER TO BE SIGNED
  @GetMapping("/profile")
  public ResponseEntity<ResponseProfileDto> getEmployerProfileById() {
    Long userId = parsedUserId();
    EmployerProfile employerProfile = employerService.findEmployerProfileById(userId);

    if (employerProfile == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseProfileDto(employerProfile));
  }








  @GetMapping("/profile/all")
  public ResponseEntity<List<ResponseProfileDto>> getAllEmployerProfiles() {
    List<EmployerProfile> employerProfiles = employerService.findAllEmployerProfiles();
    List<ResponseProfileDto> responseList = employerProfiles.stream()
        .map(this::mapToResponseProfileDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseList);
  }

  @GetMapping
  public ResponseEntity<List<ResponseEmployerDto>> getAllEmployers() {
    List<Employer> employers = employerService.findAllEmployers();
    List<ResponseEmployerDto> responseList = employers.stream()
        .map(this::mapToResponseEmployerDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseList);
  }



  @GetMapping("/profile/search/username")
  public ResponseEntity<ResponseEmployerProfileDto> getEmployerProfileByUsername(@RequestParam("username") String username) {
    //Employer employer = employerService.findEmployerByUsername(username);
    EmployerProfile employerProfile = employerService.findEmployerProfileByUsername(username);
    if (employerProfile == null) {
      return ResponseEntity.notFound().build();
    }
    ResponseEmployerProfileDto responseEmployerProfileDto = mapToResponseProfileDto(employerProfile);
    return new ResponseEntity<>(responseEmployerProfileDto, HttpStatus.OK);
  }



//  @GetMapping("/profile/search/name")
//  public ResponseEntity<List<ResponseProfileDto>> getEmployersByName(@RequestParam("name") String name) {
//    List<EmployerProfile> employerProfiles = employerService.findEmployerProfilesByName(name);
//    List<ResponseProfileDto> responseList = employerProfiles.stream()
//        .map(this::mapToResponseProfileDto)
//        .collect(Collectors.toList());
//    return ResponseEntity.ok(responseList);
//  }

  @GetMapping("/profile/search/name")
  public ResponseEntity<List<ResponseEmployerDto>> getEmployersByName(@RequestParam("name") String name) {
    List<Employer> employers = employerService.findEmployersByName(name);
    List<ResponseEmployerDto> responseList = employers.stream()
        .map(this::mapToResponseEmployerDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseList);
  }




  private ResponseEmployerProfileDto mapToResponseProfileDto(EmployerProfile profile) {
    ResponseEmployerProfileDto responseProfileDto = new ResponseEmployerProfileDto();
    responseProfileDto.name = profile.getName();
    responseProfileDto.bio = profile.getBio();
    responseProfileDto.jobPostsSize = profile.getJobPosts().size();
    responseProfileDto.jobPosts = profile.getJobPosts().stream().map(responseMapperService::mapToResponseJobPostDto).collect(Collectors.toList());
    return responseProfileDto;
  }


  // Utility method to map Employer entity to ResponseEmployerDto
  private ResponseEmployerDto mapToResponseEmployerDto(Employer employer) {
    ResponseEmployerDto responseEmployerDto = new ResponseEmployerDto();
    responseEmployerDto.employer_id = employer.getID();
    responseEmployerDto.username = employer.getUsername();
    responseEmployerDto.employerProfile = mapToResponseProfileDto(employer.getProfile());
    return responseEmployerDto;
  }
}
