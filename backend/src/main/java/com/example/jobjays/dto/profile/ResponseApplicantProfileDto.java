package com.example.jobjays.dto.profile;

import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import com.example.jobjays.model.JobPost;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
public class ResponseApplicantProfileDto extends ResponseProfileDto {
  public List<ResponseJobPostDto> appliedJobs;
  public Set<ResponseJobPostDto> savedJobs;
}
