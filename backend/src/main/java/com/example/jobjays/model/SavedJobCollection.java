package com.example.jobjays.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Getter
@Setter
public class SavedJobCollection {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true)
  private String name;

  @ManyToOne
  @JoinColumn(name = "applicant_id", nullable = false)
  private Applicant applicant;

  @ManyToMany
  @JoinTable(
      name = "applicants_saved_job_collections_jobs", //"saved_job_collections_job_posts"
      joinColumns = @JoinColumn(name = "id"),
      inverseJoinColumns = @JoinColumn(name = "job_post_jobid")
  )
  private Set<JobPost> jobPosts = new HashSet<>();

  public SavedJobCollection() {}
  public SavedJobCollection(Applicant applicant, String name) {
    this.applicant = applicant;
    this.name = name;

  }
}
