package com.example.jobjays.dto.jobPost;

import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public class CreateJobPostDto {

  @NotBlank
  private String title;


  @NotBlank
  private String description;

  @NotBlank
  private String location;

  @NotNull
  @Positive
  @Min(10000) // Minimum salary is 10,000
  private Double salary;

  @Future
  private LocalDateTime closedDate; // Needs to be converted to LocalDateTime on frontend before passed

  @NotBlank
  private Long userId; // userId of user is passed and used to find employer on backend (service)

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public String getLocation() {
    return location;
  }

  public Double getSalary() {
    return salary;
  }

  public LocalDateTime getClosedDate() {
    return closedDate;
  }

  public Long getUserId() {
    return userId;
  }
}
