package com.example.jobjays.dto.jobPost;

import com.example.jobjays.dto.employer.ResponseEmployerDto;

import java.time.LocalDateTime;

public class ResponseJobPostDto {
  public Long id;
  public String companyName;
  public String title;
  public String description;
  public String location;
  public Double salary;
  public LocalDateTime postedDate;
  public LocalDateTime closedDate;
  public Integer applicantsSize;
  //public ResponseEmployerDto employer;


}
