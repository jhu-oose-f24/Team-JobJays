package com.jobjays.notification_logger.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "employer_notification")
public class EmployerNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employer_job_id", nullable = false)
    private Long employerJobId;

    @Column(name = "applicant_match_id", nullable = false)
    private Long applicantMatchId;

    @Column(name = "score", nullable = false)
    private Double score;

    @Column(name = "employer_name")
    private String employerName;

    @Column(name = "applicant_name")
    private String applicantName;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(name = "generated_at")
    private LocalDateTime generatedAt;

    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployerJobId() {
        return employerJobId;
    }

    public void setEmployerJobId(Long employerJobId) {
        this.employerJobId = employerJobId;
    }

    public Long getApplicantMatchId() {
        return applicantMatchId;
    }

    public void setApplicantMatchId(Long applicantMatchId) {
        this.applicantMatchId = applicantMatchId;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getEmployerName() {
        return employerName;
    }

    public void setEmployerName(String employerName) {
        this.employerName = employerName;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
