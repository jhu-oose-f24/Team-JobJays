package com.example.jobjays.dto.jobPost;

import java.time.LocalDateTime;

public class ResponseJobPostDto {
  public Long id;
  public String title;
  public String description;
  public String location;
  public Double salary;
  public LocalDateTime postedDate;
  public LocalDateTime closedDate;

}
