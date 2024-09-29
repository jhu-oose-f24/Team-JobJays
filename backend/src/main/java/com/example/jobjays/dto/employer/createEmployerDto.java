package com.example.jobjays.dto.employer;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class createEmployerDto {

  @NotBlank
  String username;

  @NotBlank
  String password;

  @Email
  String email;

  @NotBlank
  String employerName;

  @NotBlank
  String employerInfo;

}
