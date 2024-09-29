package com.example.jobjays.dto.jobPost;

import java.time.LocalDateTime;

public class ResponseJobPostDto {
  Long id;
  String title;
  String description;
  String location;
  Double salary;
  LocalDateTime postedDate;
  LocalDateTime closedDate;

}
