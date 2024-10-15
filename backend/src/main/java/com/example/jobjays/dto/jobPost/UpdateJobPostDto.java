package com.example.jobjays.dto.jobPost;

import com.example.jobjays.model.Location;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;

public class UpdateJobPostDto {


  String title;

  String description;

  Location location;

  @Positive
  Double minSalary;

  @Positive
  Double maxSalary;

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

  public Double getMinSalary() {
    return minSalary;
  }

  public Double getMaxSalary() {
    return maxSalary;
  }

  public LocalDateTime getClosedDate() {
    return closedDate;
  }



}
