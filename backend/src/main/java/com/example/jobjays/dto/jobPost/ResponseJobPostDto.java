package com.example.jobjays.dto.jobPost;

import com.example.jobjays.model.Location;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
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
  private String jobType;
  private String industry;
  private String workTiming;
  private List<String> tags;
  private List<String> skillsRequired;


  // public ResponseEmployerDto employer;

  public String setCompanyName(String companyName) {
    this.companyName = companyName;
    return companyName;
  }
}
