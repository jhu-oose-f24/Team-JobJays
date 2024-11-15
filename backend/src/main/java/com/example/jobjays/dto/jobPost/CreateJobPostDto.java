package com.example.jobjays.dto.jobPost;

import com.example.jobjays.model.Location;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class CreateJobPostDto {

  @NotBlank
  private String title;

  @NotBlank
  private String description;

  @NotNull
  private Location location;

  @Setter
  @NotNull
  private String jobType;
  @Setter
  private String industry;
  @Setter
  @NotNull
  private String workTiming;

  @Setter
  List<String> tags;


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

}
