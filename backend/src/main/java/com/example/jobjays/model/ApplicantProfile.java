package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.*;


import java.util.ArrayList;
import java.util.List;

@JsonTypeName("applicantProfile")
@Embeddable
public class ApplicantProfile implements Profile {


  private String name;
  private String bio;

  @Transient
  private Applicant applicant;
  @OneToMany
  private List<JobPost> appliedJobs;


  public ApplicantProfile() {}

  public ApplicantProfile(Applicant applicant, String name, String bio) {
    this.applicant = applicant;
    this.appliedJobs = new ArrayList<>();
    this.name = name;
    this.bio = bio;
  }

  @Transient
  public Applicant getUser() {
    return this.applicant;
  }


  public String getName() {
    return this.name;
  }

  String setName(String name) {
    this.name = name;
    return name;
  }

  public String getBio() {
    return this.bio;
  }

  String setBio(String bio) {
    this.bio = bio;
    return bio;
  }

  public List<JobPost> getAppliedJobs() {
    return this.appliedJobs;
  }

  public void editProfile(String name, String bio) {
    if (name.isEmpty()) {
      this.setName(this.getName());
    } else {
      this.setName(name);
    }
    if (bio.isEmpty()) {
      this.setBio(this.getBio());
    } else {
      this.setBio(bio);
    }
  }

  public Profile editProfile(Profile profile) {
    this.setName(profile.getName());
    this.setBio(profile.getBio());
    return this;
  }

  void trackApplications() {
    //TODO: Implement this method

  }
}
