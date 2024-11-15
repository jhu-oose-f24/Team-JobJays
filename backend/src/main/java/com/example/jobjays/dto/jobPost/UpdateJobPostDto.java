package com.example.jobjays.dto.jobPost;

import com.example.jobjays.model.Location;
import jakarta.validation.constraints.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class UpdateJobPostDto {


  String title;

  String description;

  Location location;

  @Positive
  Double minSalary;

  @Positive
  Double maxSalary;

  @Future
  LocalDateTime closedDate;

  String jobType;

  String industry;

  String workTiming;

  List<String> tags;

  List<String> skillsRequired;





}
