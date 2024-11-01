package com.example.jobjays.dto.applicant;

import com.example.jobjays.dto.profile.ResponseProfileDto;
import com.example.jobjays.model.ApplicantResume;
import lombok.Builder;
import lombok.Data;
import java.util.List;


@Data
@Builder
public class ResponseApplicantDto {
  public Long applicantId;

  public String username;

  public ResponseProfileDto applicantProfile;

  private ApplicantResume applicantResume;
  private List<ApplicantResume> resumes;

  public String failReason;
}
