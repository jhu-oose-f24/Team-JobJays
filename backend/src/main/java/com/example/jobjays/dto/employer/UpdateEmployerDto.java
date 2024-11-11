package com.example.jobjays.dto.employer;

import lombok.Data;

@Data
public class UpdateEmployerDto {

  String employerName;

  String employerInfo;

  Boolean enabled;

  String token;


  public String getEmployerName() {
    return employerName;
  }

  public String getEmployerInfo() {
    return employerInfo;
  }
}
