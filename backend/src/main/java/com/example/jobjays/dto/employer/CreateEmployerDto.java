package com.example.jobjays.dto.employer;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateEmployerDto {

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


  Boolean enabled;

  String verificationToken;


  public String getUsername() {
    return username;
  }

  public String getPassword() {
    return password;
  }

  public String getEmail() {
    return email;
  }

  public String getEmployerName() {
    return employerName;
  }

  public String getEmployerInfo() {
    return employerInfo;
  }


}
