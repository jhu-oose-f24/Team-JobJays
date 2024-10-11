package com.example.jobjays.controller;

import com.example.jobjays.dto.profile.ResponseEmployerProfileDto;
import com.example.jobjays.dto.profile.ResponseProfileDto;
import com.example.jobjays.dto.employer.CreateEmployerDto;
import com.example.jobjays.dto.employer.ResponseEmployerDto;
import com.example.jobjays.dto.employer.UpdateEmployerDto;
import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import com.example.jobjays.model.Employer;
import com.example.jobjays.model.EmployerProfile;
import com.example.jobjays.model.JobPost;
import com.example.jobjays.service.EmployerService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/companies")
public class EmployerController {

  private final EmployerService employerService;

  public EmployerController(EmployerService employerService) {
    this.employerService = employerService;
  }

  @PostMapping
  public ResponseEntity<ResponseEmployerDto> addEmployer(@RequestBody CreateEmployerDto createEmployerDto) {
    Employer employer = employerService.addEmployer(createEmployerDto);
    ResponseEmployerDto responseEmployerDto = mapToResponseEmployerDto(employer);
//    HttpHeaders headers = new HttpHeaders();
//    headers.setLocation(URI.create("http://localhost:8080/api/companies/profile/" + employer.getID()));
    return new ResponseEntity<>(responseEmployerDto, HttpStatus.CREATED);
  }

  @PutMapping("/profile/{id}")
  public ResponseEntity<ResponseEmployerDto> updateEmployer(@RequestBody UpdateEmployerDto updateEmployerDto, @PathVariable Long id) {
    Employer updatedEmployer = employerService.updateEmployer(updateEmployerDto, id);
    if (updatedEmployer == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseEmployerDto(updatedEmployer));
  }

  @DeleteMapping("/profile/{id}")
  public ResponseEntity<Void> deleteEmployer(@PathVariable Long id) {
    employerService.deleteEmployer(id);
    return ResponseEntity.noContent().build();
  }

//  @GetMapping("/profile/{id}")
//  public ResponseEntity<ResponseEmployerDto> getEmployerById(@PathVariable Long id) {
//    Employer employer = employerService.findEmployerById(id);
//    if (employer == null) {
//      return ResponseEntity.notFound().build();
//    }
//    return ResponseEntity.ok(mapToResponseEmployerDto(employer));
//  }

  @GetMapping("/profile/{id}")
  public ResponseEntity<ResponseProfileDto> getEmployerProfileById(@PathVariable Long id) {
    EmployerProfile employerProfile = employerService.findEmployerProfileById(id);
    if (employerProfile == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseProfileDto(employerProfile));
  }


//  @GetMapping("/profile/all")
//  public ResponseEntity<List<ResponseProfileDto>> getAllEmployerProfiles() {
//    List<EmployerProfile> employerProfiles = employerService.findAllEmployerProfiles();
//    List<ResponseProfileDto> responseList = employerProfiles.stream()
//        .map(this::mapToResponseProfileDto)
//        .collect(Collectors.toList());
//    return ResponseEntity.ok(responseList);
//  }

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
//    HttpHeaders headers = new HttpHeaders();
//    headers.setLocation(URI.create("http://localhost:8080/api/companies/profile/" + employerProfile.getUser().getID()));
    return new ResponseEntity<>(responseEmployerProfileDto, HttpStatus.OK);
  }



  @GetMapping("/profile/search/name")
  public ResponseEntity<List<ResponseProfileDto>> getEmployersByName(@RequestParam("name") String name) {
    List<EmployerProfile> employerProfiles = employerService.findEmployerProfilesByName(name);
    List<ResponseProfileDto> responseList = employerProfiles.stream()
        .map(this::mapToResponseProfileDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseList);
  }



  //TODO can refactor into a class
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

  private ResponseEmployerProfileDto mapToResponseProfileDto(EmployerProfile profile) {
    ResponseEmployerProfileDto responseProfileDto = new ResponseEmployerProfileDto();
    responseProfileDto.name = profile.getName();
    responseProfileDto.bio = profile.getBio();
    responseProfileDto.jobPostsSize = profile.getJobPosts().size();
    responseProfileDto.jobPosts = profile.getJobPosts().stream().map(this::mapToResponseJobPostDto).collect(Collectors.toList());

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
