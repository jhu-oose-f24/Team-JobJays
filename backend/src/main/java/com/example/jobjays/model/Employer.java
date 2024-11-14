package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Entity
@ToString
public class Employer implements User {
  @Column(insertable=false, updatable=false)
  private String name;
  private String username;
  private String password;
  private String email;
  @Setter
  @Getter
  private Boolean enabled;
  private String token;
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
          String employerInfo,
          Boolean enabled,
          String token

  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.employerName = employerName;
    this.employerInfo = employerInfo;
    this.profile = new EmployerProfile(this, employerName, employerInfo); //could also replace employerName and Info with empty strings literals
    this.enabled = enabled;
    this.token = token;
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

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return this.password;
  }


  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return this.email;
  }

  @Override
  public Boolean getEnabled() {
    return enabled;
  }

  @Override
  public Boolean setEnabled(Boolean enabled) {
    return enabled;
  }

  @Override
  public String getToken() {
    return token;
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


