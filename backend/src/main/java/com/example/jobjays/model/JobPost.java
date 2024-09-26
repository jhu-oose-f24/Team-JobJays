package com.example.jobjays.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonTypeName;

import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;


@JsonTypeName("jobPost")
public class JobPost implements Post {


  private String title ;
  private String description;
  private String location;
  private Double salary;

  private final String jobID;
  private LocalDateTime postedDate;
  private LocalDateTime closedDate;
  public final Employer employer;



  public JobPost(
      String title,
      String description,
      String location,
      Double salary,
      LocalDateTime closedDate,
      Employer employer
      ) {

    this.jobID = UUID.randomUUID().toString();
    this.title = title;
    this.description = description;
    this.location = location;
    this.salary = salary;
    this.postedDate = LocalDateTime.now();
    this.closedDate = closedDate;
    this.employer = employer;

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

  public String getLocation() {
    return location;
  }

  public String setLocation(String location) {
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
  public String getID() {
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
