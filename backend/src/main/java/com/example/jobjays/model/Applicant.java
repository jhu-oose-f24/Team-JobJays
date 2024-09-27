package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonTypeName;

import java.util.ArrayList;
import java.util.UUID;

@JsonTypeName("applicant")
public class Applicant implements User {
  private String username;
  private String password;
  private String email;

  private final String applicantId;
  private String resume;
  private final ApplicantProfile profile;


  public Applicant(
      String username,
      String password,
      String email,
      String resume
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.applicantId = UUID.randomUUID().toString();
    this.resume = resume;
    this.profile = new ApplicantProfile(this, "", "");

  }

  public String getID() {
    return this.applicantId;
  }

  public String getUsername() {
    return this.username;
  }

  public String setUsername(String username) {
    this.username = username;
    return username;
  }

  public String getPassword() {
    return this.password;
  }

  public String setPassword(String password) {
    this.password = password;
    return password;
  }


  public String getEmail() {
    return this.email;
  }

  public String setEmail(String email) {
    this.email = email;
    return email;
  }

  public String getResume() {
    return this.resume;
  }

  public String setResume(String resume) {
    this.resume = resume;
    return resume;
  }

  public Profile getProfile() {
    return this.profile;
  }

  void applyToJob(JobPost job) {
    this.profile.getAppliedJobs().add(job);

  }

  public void viewAppliedJobs() {
    //TODO: Implement
  }
}