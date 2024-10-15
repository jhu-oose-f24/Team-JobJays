package com.example.jobjays.dto.applicant;

import lombok.Data;

@Data
public class UpdateApplicantDto {
  String name;

  String bio;

  Boolean enabled;

  String token;

  String resume;

  public String getName() {
    return this.name;
  }

  public String getBio() {
    return this.bio;
  }

  public String getResume() {
    return this.resume;
  }
}
