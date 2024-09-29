package com.example.jobjays.dto.applicant;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class createApplicantDto {

  @NotBlank
  String username;

  @NotBlank
  String password;

  @Email
  String email;

  String resume;

}
