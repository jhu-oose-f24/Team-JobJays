package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Embeddable
@JsonTypeName("employerProfile")
public class EmployerProfile implements Profile {

  private String name;
  private String bio;

  @Transient
  private Employer employer; //User

  @OneToMany
  private List<JobPost> jobPosts;


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

  List<JobPost> getJobPosts() {
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

  public Profile editProfile(Profile profile) {
    this.setName(profile.getName());
    this.setBio(profile.getBio());
    return this;
  }

  void manageJobPosts() {
    //TODO: Implement this method
  }
}
