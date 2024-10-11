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
  private Double minSalary;

  @NotNull
  @Positive
  private Double maxSalary;


  @Future
  private LocalDateTime closedDate; // Needs to be converted to LocalDateTime on frontend before passed

  //@NotBlank
  private String username; // username of user is passed and used to find employer on backend (service)

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public String getLocation() {
    return location;
  }

  public Double getMinSalary() {
    return minSalary;
  }

  public Double getMaxSalary() {
    return maxSalary;
  }

  public LocalDateTime getClosedDate() {
    return closedDate;
  }

  public String getUsername() {
    return username;
  }
}
