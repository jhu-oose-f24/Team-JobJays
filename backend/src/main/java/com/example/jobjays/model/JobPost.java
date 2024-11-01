package com.example.jobjays.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;



@Entity
public class JobPost implements Post {


  private String title ;
  private String description;
  private Location location;
  private Double minSalary;
  private Double maxSalary;
  // add there same props
  @Getter
  @Setter
  private String industry;
  @Getter
  @Setter
  private String jobType;
  @Getter
  @Setter
  private String workTiming;

  @Getter
  @Setter
  @ElementCollection
  @CollectionTable(name = "job_tags", joinColumns = @JoinColumn(name = "job_id"))
  @Column(name = "tag")
  private List<String> tags;

  @Getter
  @Setter
  @ElementCollection
  @CollectionTable(name = "job_required_skills", joinColumns = @JoinColumn(name = "job_id"))
  @Column(name = "skill_required")  // Column name for skills in the job_required_skills table
  private List<String> skillsRequired;


  @Id
  @GeneratedValue
  private Long jobID;
  private LocalDateTime postedDate;
  private LocalDateTime closedDate;

  @ManyToMany
  @JoinTable(
      name = "job_post_applicants",
      joinColumns = @JoinColumn(name = "job_post_jobid"),
      inverseJoinColumns = @JoinColumn(name = "applicant_id")
  )
  private Set<Applicant> applicants;

  @ManyToOne
  public Employer employer;

public JobPost() {}

  public JobPost(
      String title,
      String description,
      Location location,
      Double minSalary,
      Double maxSalary,
      LocalDateTime closedDate,
      Employer employer,
      List<String> tags,
        String industry,
        String jobType,
        String workTiming,
        List<String> skillsRequired
      ) {

    //this.jobID = UUID.randomUUID().toString();
    this.title = title;
    this.description = description;
    this.location = location;
    this.minSalary = minSalary;
    this.maxSalary = maxSalary;
    this.postedDate = LocalDateTime.now();
    this.closedDate = closedDate;
    this.employer = employer;
    this.applicants = new HashSet<>();
    this.industry = industry;
    this.jobType = jobType;
    this.workTiming = workTiming;
    this.skillsRequired = skillsRequired;
    this.tags =tags;
    buildTags();

  }


  private void buildTags() {
  this.tags = new ArrayList<>();
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

  public Double getMinSalary() {
    return minSalary;
  }
  public Double getMaxSalary() {
    return maxSalary;
  }

  public Double setMinSalary(Double minSalary) {
    this.minSalary = minSalary;
    return minSalary;
  }
  public Double setMaxSalary(Double maxSalary) {
    this.maxSalary = maxSalary;
    return maxSalary;
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

  public Set<Applicant> getApplicants() {
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
