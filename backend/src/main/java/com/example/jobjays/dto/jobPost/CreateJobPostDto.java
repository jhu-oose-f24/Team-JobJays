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

  @NotNull
  private Location location;

  @Getter
  @Setter
  @NotNull
  private String jobType;
  @Getter
  @Setter
  private String industry;
  @Getter
  @Setter
  @NotNull
  private String workTiming;

  @Getter
  @Setter
  List<String> tags;


  @Getter
  @Setter
  List<String> skillsRequired;
  @NotNull
  @Positive
  private Double minSalary;

  @NotNull
  @Positive
  private Double maxSalary;


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
