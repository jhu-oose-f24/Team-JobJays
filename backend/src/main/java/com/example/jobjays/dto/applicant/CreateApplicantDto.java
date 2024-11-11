package com.example.jobjays.dto.applicant;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateApplicantDto {

  @NotBlank
  String username;

  @NotBlank
  String password;

  @Email
  String email;

  Boolean enabled;

  String verificationToken;

  String resume;



  @NotBlank
  String applicantName;

  @NotBlank
  String applicantInfo;

}
