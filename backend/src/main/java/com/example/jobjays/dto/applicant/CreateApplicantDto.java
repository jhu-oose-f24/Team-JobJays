package com.example.jobjays.dto.applicant;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class CreateApplicantDto {

  @NotBlank
  String username;

  @NotBlank
  String password;

  @Email
  String email;

  String resume;

  @NotBlank
  String applicantName;

  @NotBlank
  String applicantInfo;

  public String getUsername() {
    return this.username;
  }

  public String getPassword() {
    return this.password;
  }

  public String getEmail() {
    return this.email;
  }

  public String getResume() {
    return this.resume;
  }

  public String getApplicantName() {
    return this.applicantName;
  }

  public String getApplicantInfo() {
    return this.applicantInfo;
  }

}
