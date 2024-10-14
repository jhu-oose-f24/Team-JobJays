package com.example.jobjays.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;



@Entity
public class JobPost implements Post {


  private String title ;
  private String description;
  private Location location;
  private Double salary;

  @Getter
  @Setter
  @ElementCollection
  @CollectionTable(name = "job_tags", joinColumns = @JoinColumn(name = "job_id"))
  @Column(name = "tag")
  private List<String> tags;
  @Id
  @GeneratedValue
  private Long jobID;
  private LocalDateTime postedDate;
  private LocalDateTime closedDate;

  @ManyToMany
  private List<Applicant> applicants;

  @ManyToOne
  public Employer employer;

public JobPost() {}

  public JobPost(
      String title,
      String description,
      Location location,
      Double salary,
      LocalDateTime closedDate,
      Employer employer,
      List<String> tags
      ) {

    //this.jobID = UUID.randomUUID().toString();
    this.title = title;
    this.description = description;
    this.location = location;
    this.salary = salary;
    this.postedDate = LocalDateTime.now();
    this.closedDate = closedDate;
    this.employer = employer;
    this.applicants = new ArrayList<>();
    this.tags =tags;
    buildTags();

  }


  private void buildTags() {
     this.tags.add(title);
     this.tags.add(location.getCity());
        this.tags.add(location.getState());
        this.tags.add(location.getCountry());
        this.tags.add(employer.getProfile().getName());
        this.tags.add(employer.getProfile().getIndustry());

  }
  public String getTitle() {
    return title;
  }

  public String setTitle(String title) {
    this.title = title;
    return title;
  }

  public String getDescription() {
    return description;
  }

  public String setDescription(String description) {
    this.description = description;
    return description;
  }

  public Location getLocation() {
    return location;
  }

  public Location setLocation(Location location) {
    this.location = location;
    return location;
  }

  public Double getSalary() {
    return salary;
  }

  public Double setSalary(Double salary) {
    this.salary = salary;
    return salary;
  }

  //Should not change
  public Long getID() {
    return jobID;
  }

  public LocalDateTime getPostedDate() {
    return postedDate;
  }

  public LocalDateTime setPostedDate(LocalDateTime postedDate) {
    this.postedDate = postedDate;
    return postedDate;
  }

  public LocalDateTime getClosedDate() {
    return closedDate;
  }

  public LocalDateTime setClosedDate(LocalDateTime closedDate) {
    this.closedDate = closedDate;
    return closedDate;
  }

  //Should not change
  public Employer getEmployer() {
    return employer;
  }

  public void addApplicant(Applicant applicant) {
    applicants.add(applicant);
  }

  public void removeApplicant(Applicant applicant) {
    applicants.remove(applicant);
  }

  public List<Applicant> getApplicants() {
    return applicants;
  }

  /*
    * Publish the job post, done by the Employer
   */
  public void publish() {
    System.out.println("Job post published");
  }

  /*
    * Close the job post, done by the Employer that published the job post
   */
  public void close() {
    System.out.println("Job post closed");
  }

}
