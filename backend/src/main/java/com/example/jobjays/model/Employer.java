package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.*;


@Entity
public class Employer implements User {
  @Column(insertable=false, updatable=false)
  private String name;
  private String username;
  private String password;
  private String email;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long employer_id;
  private String employerName; //companyName
  private String employerInfo; //companyInfo

  @Embedded
  private EmployerProfile profile;

  public Employer() {}

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
    this.employerName = employerName;
    this.employerInfo = employerInfo;
    this.profile = new EmployerProfile(this, employerName, employerInfo); //could also replace employerName and Info with empty strings literals
  }

  public Long getID() {
    return this.employer_id;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String getName() {
    return name;
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

  public String setEmail(String email) {
    this.email = email;
    return email;
  }

  public EmployerProfile getProfile() {
    return this.profile;
  }

  public void postJob(JobPost job) {
    this.profile.getJobPosts().add(job);
  }

  void viewApplications() {
    //TODO: Implement this
  }


}


