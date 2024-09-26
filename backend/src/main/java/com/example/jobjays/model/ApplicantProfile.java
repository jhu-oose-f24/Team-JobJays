package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonTypeName;

import java.util.ArrayList;

@JsonTypeName("applicantProfile")
public class ApplicantProfile implements Profile {

  private String name;
  private String bio;
  private final Applicant applicant;
  private ArrayList<JobPost> appliedJobs;


  public ApplicantProfile(Applicant applicant, String name, String bio) {
    this.applicant = applicant;
    this.appliedJobs = new ArrayList<>();
    this.name = name;
    this.bio = bio;
  }

  public Applicant getApplicant() {
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

  public ArrayList<JobPost> getAppliedJobs() {
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

  void trackApplications() {
    //TODO: Implement this method

  }
}
