package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonTypeName;

import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@JsonTypeName("employer")
public class Employer implements User {
  private String username;
  private String password;
  private String email;
  private final String companyID;
  private String employerName; //companyName
  private String employerInfo; //companyInfo
  private final EmployerProfile profile;


  public Employer(
      String username,
      String password,
      String email,
      String employerName,
      String employerInfo

  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.companyID = UUID.randomUUID().toString(); //TODO: Placeholder until we have a database;
    this.employerName = employerName;
    this.employerInfo = employerInfo;
    this.profile = new EmployerProfile(this, employerName, employerInfo); //could also replace employerName and Info with empty strings literals
  }

  public String getID() {
    return this.companyID;
  }

  public String getUsername() {
    return this.username;
  }

  String setUsername(String username) {
    this.username = username;
    return username;
  }

  public String getPassword() {
    return this.password;
  }


  String setPassword(String password) {
    this.password = password;
    return password;
  }

  public String getEmail() {
    return this.email;
  }

  String setEmail(String email) {
    this.email = email;
    return email;
  }

  public Profile getProfile() {
    return this.profile;
  }

  void postJob(JobPost job) {
    this.profile.getJobPosts().add(job);
  }

  void viewApplications() {
    //TODO: Implement this
  }


}


