package com.example.jobjays.dto.profile;

import com.example.jobjays.dto.jobPost.ResponseJobPostDto;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class ResponseEmployerProfileDto extends ResponseProfileDto {
  public Integer jobPostsSize;
  public List<ResponseJobPostDto> jobPosts;

}
