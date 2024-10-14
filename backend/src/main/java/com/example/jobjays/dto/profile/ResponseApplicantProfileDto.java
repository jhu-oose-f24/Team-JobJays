package com.example.jobjays.dto.profile;

import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import com.example.jobjays.model.JobPost;

import java.util.List;

public class ResponseApplicantProfileDto extends ResponseProfileDto {
  public List<ResponseJobPostDto> appliedJobs;
}
