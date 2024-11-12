package com.example.jobjays.controller;

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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/companies")
public class EmployerController {

  private final EmployerService employerService;
  private final ResponseMapperService responseMapperService;


  @Autowired
  private EmailSendWrapper emailSendWrapper;

  public EmployerController(EmployerService employerService, ResponseMapperService responseMapperService) {
    this.employerService = employerService;
    this.responseMapperService = responseMapperService;
  }


  @GetMapping("/verify")
  public RedirectView verifyUser(@RequestParam("token") String token) {
    Employer employer = employerService.findByVerificationToken(token);
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
  @PostMapping
  public ResponseEntity<ResponseEmployerDto> addEmployer(@RequestBody CreateEmployerDto createEmployerDto) {
    createEmployerDto.setEnabled(false);
    String token = TokenGenerator.generateToken();
    createEmployerDto.setVerificationToken(token);
    createEmployerDto.setEnabled(false); // User is disabled until they verify

    Employer employer = employerService.addEmployer(createEmployerDto);
    emailSendWrapper.sendVerificationEmailForEmployer(employer.getEmail(), token);
    ResponseEmployerDto responseEmployerDto = mapToResponseEmployerDto(employer);
//    HttpHeaders headers = new HttpHeaders();
//    headers.setLocation(URI.create("http://localhost:8080/api/companies/profile/" + employer.getID()));
    return new ResponseEntity<>(responseEmployerDto, HttpStatus.CREATED);
  }

  //REQUIRES USER TO BE SIGNED
  //REQUIRES USER TO BE OWNER OF THE PROFILE
  @PutMapping("/profile/{id}")
  public ResponseEntity<ResponseEmployerDto> updateEmployer(@RequestBody UpdateEmployerDto updateEmployerDto, @PathVariable Long id) {
    Employer updatedEmployer = employerService.updateEmployer(updateEmployerDto, id);
    if (updatedEmployer == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseEmployerDto(updatedEmployer));
  }

  //REQUIRES USER TO BE SIGNED
  //REQUIRES USER TO BE OWNER OF THE PROFILE
  @DeleteMapping("/profile/{id}")
  public ResponseEntity<Void> deleteEmployer(@PathVariable Long id) {
    employerService.deleteEmployer(id);
    return ResponseEntity.noContent().build();
  }

  //REQUIRES USER TO BE SIGNED
  @GetMapping("/profile/{id}")
  public ResponseEntity<ResponseProfileDto> getEmployerProfileById(@PathVariable Long id, @RequestHeader("Authorization") String token) {
    EmployerProfile employerProfile = employerService.findEmployerProfileById(id);
    System.out.println(token);
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
