package com.jobjays.applicant_job_matcher.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationMessageDTO {
    private String applicantId;
    private String jobId;
    private String jobTitle;
    private String companyName;
    private double score;
    private String location;
    private double salary;
    private String type; // Type of notification for APPLICANT or EMPLOYER

    public NotificationMessageDTO(String applicantId, String jobId, String jobTitle, String companyName, double score, String location, double salary, String type) {
        this.applicantId = applicantId;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.companyName = companyName;
        this.score = score;
        this.location = location;
        this.salary = salary;
        this.type = type;
    }

    // Getters and Setters
}
