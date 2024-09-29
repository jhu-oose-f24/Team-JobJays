package com.example.jobjays.dto;

import com.example.jobjays.model.JobPost;
import com.example.jobjays.dto.jobPost.ResponseJobPostDto;

import java.util.List;

public class ResponseEmployerProfileDto extends ResponseProfileDto {
  public Integer jobPostsSize;
  public List<ResponseJobPostDto> jobPosts;

}
