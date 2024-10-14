package com.example.jobjays.dto.jobPost;

import com.example.jobjays.model.Location;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public class UpdateJobPostDto {


  String title;

  String description;

  Location location;

  @Positive
  @Min(10000) // Minimum salary is 10,000
  Double salary;

  @Future
  LocalDateTime closedDate; // Needs to be converted to LocalDateTime on frontend before passed


  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public Location getLocation() {
    return location;
  }

  public Double getSalary() {
    return salary;
  }

  public LocalDateTime getClosedDate() {
    return closedDate;
  }



}
