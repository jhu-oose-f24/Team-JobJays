package com.example.jobjays.dto.jobPost;

import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public class updateJobPostDto {


  String title;

  String description;

  String location;

  @Positive
  @Min(10000) // Minimum salary is 10,000
  Double salary;

  @Future
  LocalDateTime closedDate; // Needs to be converted to LocalDateTime on frontend before passed

  @NotBlank
  String username; // username of user is passed and converted to employer on backend (service)
}
