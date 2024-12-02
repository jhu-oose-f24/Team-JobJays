package com.example.jobjays.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.stream.Collectors;


@Entity
//@Table(name = "impressions")
@Getter
@Setter
@NoArgsConstructor
//@DiscriminatorValue("IMPRESSION")
public class Impressions extends PostMetrics {
  private Integer totalImpressions;

  @Enumerated(EnumType.STRING)
  private ImpressionType impressionType;

  @OneToMany(mappedBy = "impressions", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ImpressionEvent> events = new ArrayList<>();

  public Impressions(JobPost jobPost) {
    super();
    this.setJobPost(jobPost);
    this.impressionType = ImpressionType.JOB_POST;
    this.totalImpressions = 0;
  }

//  public Impressions(Profile employerProfile) {
//    super();
//    this.setProfile(employerProfile);
//    this.impressionType = ImpressionType.EMPLOYER_PROFILE;
//    this.totalImpressions = 0;
//  }

  public Impressions(Employer employer) {
    super();
    this.setEmployer(employer);
    this.impressionType = ImpressionType.PROFILE;
    this.totalImpressions = 0;
  }

  public ImpressionEvent logImpression() {
    this.totalImpressions++;
    ImpressionEvent newEvent = new ImpressionEvent(this); // Create new event
    events.add(newEvent); // Log event
    return newEvent;
  }
  public List<ImpressionEvent> getImpressionsBetween(LocalDateTime start, LocalDateTime end) {
    return events.stream()
        .filter(event -> !event.getEventDate().isBefore(start) && !event.getEventDate().isAfter(end))
        .collect(Collectors.toList());
  }

  public List<ImpressionEvent> getImpressionsBefore(LocalDateTime date) {
    return events.stream()
        .filter(event -> !event.getEventDate().isBefore(date))
        .collect(Collectors.toList());
  }




}
