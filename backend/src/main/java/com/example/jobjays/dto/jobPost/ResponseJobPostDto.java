package com.example.jobjays.dto.jobPost;

import com.example.jobjays.model.Location;

import java.time.LocalDateTime;

public class ResponseJobPostDto {
  public Long id;
  public String companyName;
  public String title;
  public String description;
  public Location location;
  public Double salary;
  public Double minSalary;
  public Double maxSalary;
  public LocalDateTime postedDate;
  public LocalDateTime closedDate;
  public Integer numApplicants;

  //public ResponseEmployerDto employer;

  public String setCompanyName(String companyName) {
    this.companyName = companyName;
    return companyName;
  }
}
