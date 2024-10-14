package com.example.jobjays.dto.jobPost;

import com.example.jobjays.model.Location;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class CreateJobPostDto {

  @NotBlank
  private String title;


  @NotBlank
  private String description;

  @NotBlank
  private Location location;

  @Getter
  @Setter
  List<String> tags;

  @NotNull
  @Positive
  @Min(10000) // Minimum salary is 10,000
  private Double salary;

  @Future
  private LocalDateTime closedDate; // Needs to be converted to LocalDateTime on frontend before passed

  //@NotBlank
//  private String username; // username of user is passed and used to find employer on backend (service)

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
