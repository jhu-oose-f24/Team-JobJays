package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Embeddable
public class EmployerProfile implements Profile {

  @Setter
  @Getter
  private String industry;
  private String name;
  private String bio;

  @Transient
  private Employer employer; //User

  @OneToMany(mappedBy = "employer", cascade = CascadeType.REMOVE, orphanRemoval = true)
  private List<JobPost> jobPosts;

  @Getter
  @Setter
  @OneToOne(mappedBy = "employer", cascade = CascadeType.ALL, orphanRemoval = true)
  private Impressions impressions;

  public EmployerProfile() {}
  public EmployerProfile(Employer employer, String name, String bio) {
    this.employer = employer;
    this.jobPosts = new ArrayList<>();
    this.name = name;
    this.bio = bio;

  }

  public ImpressionEvent addImpression() {
    if (impressions == null) {
      impressions = new Impressions(this.getUser());
      //impressions.setEmployer(this.employer);
      System.out.println("Employer: " + this.employer);
      //impressions.setJobPost(this);
    }
    return impressions.logImpression();

  }



  @Transient
  public Employer getUser() {
    return this.employer;
  }


  public String getName() {
    return this.name;
  }

  public String setName(String name) {
    this.name = name;
    return name;
  }

  public String getBio() {
    return this.bio;
  }

  public String setBio(String bio) {
    this.bio = bio;
    return bio;
  }

  public List<JobPost> getJobPosts() {
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
