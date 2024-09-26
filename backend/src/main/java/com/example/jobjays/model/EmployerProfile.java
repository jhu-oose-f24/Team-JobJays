package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonTypeName;

import java.util.ArrayList;

@JsonTypeName("employerProfile")
public class EmployerProfile implements Profile {

  private String name;
  private String bio;

  private final Employer employer;
  private ArrayList<JobPost> jobPosts;


  public EmployerProfile(Employer employer, String name, String bio) {
    this.employer = employer;
    this.jobPosts = new ArrayList<>();
    this.name = name;
    this.bio = bio;

  }


  public Employer getEmployer() {
    return this.employer;
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

  ArrayList<JobPost> getJobPosts() {
    return this.jobPosts;
  }


  public void editProfile(String name, String bio) {
    if (name.isEmpty()) {
      this.setName("");
    }
    if (bio.isEmpty()) {
      this.setBio("");
    }
    this.setName(name);
    this.setBio(bio);
  }

  void manageJobPosts() {
    //TODO: Implement this method
  }
}
