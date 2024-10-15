package com.example.jobjays.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
public class Applicant implements User {

  private String username;
  @Column(insertable=false, updatable=false)
  private String name;
  private String password;
  private String email;

  @Id
  @GeneratedValue
  private Long applicantId;
  private String resume;

  @Embedded
  private ApplicantProfile profile;


  public Applicant(
      String username,
      String name,
      String password,
      String email,
      String resume
  ) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.resume = resume;
    this.profile = new ApplicantProfile(this, "", "");

  }
  public Applicant(){}

  public Long getID() {
    return this.applicantId;
  }

  @Override
  public String getName() {
    return this.name;
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

  public ApplicantProfile getProfile() {
    return this.profile;
  }

  void applyToJob(JobPost job) {
    this.profile.getAppliedJobs().add(job);

  }

  public void viewAppliedJobs() {
    //TODO: Implement
  }
}
