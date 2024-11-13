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
  @Column(unique = true)
  private String email;
  private Boolean enabled;
  private String token;
  @Id
  @GeneratedValue
  private Long applicantId;
  private String resume;

  @Embedded
  private ApplicantProfile profile;

  @Lob
  @Basic(fetch = FetchType.LAZY)
  private byte[] photo;


  public Applicant(
      String username,
      String name,
      String password,
      String email,
      Boolean enabled,
      String resume,
      String token
  ) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.enabled = enabled;
    this.resume = resume;
    this.profile = new ApplicantProfile(this, "", "");
    this.token = token;
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

  public Boolean getEnabled() {
    return this.enabled;
  }

  public Boolean setEnabled(Boolean enabled) {
    this.enabled = enabled;
    return enabled;
  }


  public String getToken() {
    return this.token;
  }

  public String setToken(String token) {
    this.token = token;
    return token;
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

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }
}
