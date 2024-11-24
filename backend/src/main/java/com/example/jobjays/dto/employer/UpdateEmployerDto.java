package com.example.jobjays.dto.employer;

import lombok.Data;

@Data
public class UpdateEmployerDto {

  String employerName; //name

  String employerInfo; //bio

  String industry;

  Boolean enabled;

  String token;


  public String getEmployerName() {
    return employerName;
  }

  public String getEmployerInfo() {
    return employerInfo;
  }
}
