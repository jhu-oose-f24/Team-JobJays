package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Transient;

import java.util.ArrayList;

@Embeddable
@JsonTypeName("employerProfile")
public class EmployerProfile implements Profile {

  private String name;
  private String bio;

  @Transient
  private Employer employer; //User
  private ArrayList<JobPost> jobPosts;


  public EmployerProfile() {}
  public EmployerProfile(Employer employer, String name, String bio) {
    this.employer = employer;
    this.jobPosts = new ArrayList<>();
    this.name = name;
    this.bio = bio;

  }

  @Transient
  public Employer getUser() {
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
