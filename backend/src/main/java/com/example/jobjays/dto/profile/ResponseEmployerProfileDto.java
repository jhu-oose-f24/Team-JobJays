package com.example.jobjays.dto.profile;

import com.example.jobjays.dto.jobPost.ResponseJobPostDto;

import java.util.List;

public class ResponseEmployerProfileDto extends ResponseProfileDto {
  public Integer jobPostsSize;
  public List<ResponseJobPostDto> jobPosts;

}
