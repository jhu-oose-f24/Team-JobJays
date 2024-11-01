package com.example.jobjays.dto.profile;

import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import com.example.jobjays.model.JobPost;

import java.util.List;
import java.util.Set;

public class ResponseApplicantProfileDto extends ResponseProfileDto {
  public List<ResponseJobPostDto> appliedJobs;
  public Set<ResponseJobPostDto> savedJobs;
}
