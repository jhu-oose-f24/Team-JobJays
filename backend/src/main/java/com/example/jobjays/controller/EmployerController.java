package com.example.jobjays.controller;

import com.example.jobjays.dto.ResponseProfileDto;
import com.example.jobjays.dto.employer.CreateEmployerDto;
import com.example.jobjays.dto.employer.ResponseEmployerDto;
import com.example.jobjays.dto.employer.UpdateEmployerDto;
import com.example.jobjays.model.Employer;
import com.example.jobjays.model.EmployerProfile;
import com.example.jobjays.service.EmployerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/companies")
public class EmployerController {

  private final EmployerService employerService;

  public EmployerController(EmployerService employerService) {
    this.employerService = employerService;
  }

  @PostMapping("/add")
  public ResponseEntity<ResponseEmployerDto> addEmployer(@RequestBody CreateEmployerDto createEmployerDto) {
    Employer employer = employerService.addEmployer(createEmployerDto);
    return ResponseEntity.ok(mapToResponseEmployerDto(employer));
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<ResponseEmployerDto> updateEmployer(@RequestBody UpdateEmployerDto updateEmployerDto, @PathVariable Long id) {
    Employer updatedEmployer = employerService.updateEmployer(updateEmployerDto, id);
    if (updatedEmployer == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseEmployerDto(updatedEmployer));
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Void> deleteEmployer(@PathVariable Long id) {
    employerService.deleteEmployer(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<ResponseEmployerDto> getEmployerById(@PathVariable Long id) {
    Employer employer = employerService.findEmployerById(id);
    if (employer == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseEmployerDto(employer));
  }

  @GetMapping
  public ResponseEntity<List<ResponseEmployerDto>> getAllEmployers() {
    List<Employer> employers = employerService.findAllEmployers();
    List<ResponseEmployerDto> responseList = employers.stream()
        .map(this::mapToResponseEmployerDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseList);
  }

  @GetMapping("/profile/{id}")
  public ResponseEntity<EmployerProfile> getEmployerProfileById(@PathVariable Long id) {
    EmployerProfile employerProfile = employerService.findEmployerProfileById(id);
    if (employerProfile == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(employerProfile);
  }

  @GetMapping("/username/{username}")
  public ResponseEntity<ResponseEmployerDto> getEmployerByUsername(@PathVariable String username) {
    Employer employer = employerService.findEmployerByUsername(username);
    if (employer == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(mapToResponseEmployerDto(employer));
  }

  @GetMapping("/name/{name}")
  public ResponseEntity<List<ResponseEmployerDto>> getEmployersByName(@PathVariable String name) {
    List<Employer> employers = employerService.findEmployersByName(name);
    List<ResponseEmployerDto> responseList = employers.stream()
        .map(this::mapToResponseEmployerDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseList);
  }

  @GetMapping("/email/{email}")
  public ResponseEntity<List<ResponseEmployerDto>> getEmployersByEmail(@PathVariable String email) {
    List<Employer> employers = employerService.findEmployersByEmail(email);
    List<ResponseEmployerDto> responseList = employers.stream()
        .map(this::mapToResponseEmployerDto)
        .collect(Collectors.toList());
    return ResponseEntity.ok(responseList);
  }

  private ResponseProfileDto mapToResponseProfileDto(EmployerProfile profile) {
    ResponseProfileDto responseProfileDto = new ResponseProfileDto();
    responseProfileDto.name = profile.getName();
    responseProfileDto.bio = profile.getBio();
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
