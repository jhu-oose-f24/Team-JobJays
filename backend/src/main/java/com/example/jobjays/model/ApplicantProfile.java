package com.example.jobjays.model;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Embeddable
public class ApplicantProfile implements Profile {


  private String name;
  private String bio;

  private String nationality;

  private String gender;

  private String education;

  private String dateOfBirth;

  private String maritalStatus;
  private String experience;
  private String website;
  private String title;


  @Transient
  private Applicant applicant;
  @ManyToMany(mappedBy = "applicants")
  private Set<JobPost> appliedJobs;
//  @ManyToMany(mappedBy = "applicant")
//  private Set<JobPost> savedJobs;

  @Getter
  @Setter
  @OneToMany(mappedBy = "applicant", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<SavedJobCollection> savedJobs = new HashSet<>();

  public ApplicantProfile() {}

  public ApplicantProfile(Applicant applicant, String name, String bio) {
    this.applicant = applicant;
    this.appliedJobs = new HashSet<>();
    this.savedJobs = new HashSet<>();
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


  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getWebsite() {
    return website;
  }

  public void setWebsite(String website) {
    this.website = website;
  }

  public Set<JobPost> getAppliedJobs() {
    return this.appliedJobs;
  }


  public String getNationality() {
    return nationality;
  }

  public String getGender() {
    return gender;
  }

  public String getEducation() {
    return education;
  }

  public String getDateOfBirth() {
    return dateOfBirth;
  }

  public String getMaritalStatus() {
    return maritalStatus;
  }

  public String getExperience() {
    return experience;
  }

  public void setNationality(String nationality) {
    this.nationality = nationality;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public void setEducation(String education) {
    this.education = education;
  }

  public void setDateOfBirth(String dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  public void setMaritalStatus(String maritalStatus) {
    this.maritalStatus = maritalStatus;
  }

  public void setExperience(String experience) {
    this.experience = experience;
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
//
//  public Set<JobPost> getSavedJobs() {
//    return savedJobs;
//  }
//
//  public void addSavedJobs(JobPost jobPost) {
//    System.out.println("About to addsavedjobs in profile");
//    savedJobs.add(jobPost);
//  }
}
