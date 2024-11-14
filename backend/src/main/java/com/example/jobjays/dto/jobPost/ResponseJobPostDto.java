package com.example.jobjays.dto.jobPost;

import com.example.jobjays.model.Location;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseJobPostDto {
  public Long id;
  public String companyName;
  public String title;
  public String description;
  public Location location;
  public Double minSalary;
  public Double maxSalary;
  public LocalDateTime postedDate;
  public LocalDateTime closedDate;
  public Integer numApplicants;

  // public ResponseEmployerDto employer;

  public String setCompanyName(String companyName) {
    this.companyName = companyName;
    return companyName;
  }
}
