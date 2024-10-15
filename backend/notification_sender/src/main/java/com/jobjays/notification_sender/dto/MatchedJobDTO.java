package com.jobjays.notification_sender.dto;

import lombok.Data;

@Data
public class MatchedJobDTO {
    private Long jobId;
    private String applicantId;
    private Double matchScore;
    private String jobTitle;
    private String employerName;
    private String applicantEmail;
    private String applicantName;

    public MatchedJobDTO() {}

    public MatchedJobDTO(Long jobId, String applicantId, Double matchScore, String jobTitle,
                         String employerName, String applicantEmail, String applicantName) {
        this.jobId = jobId;
        this.applicantId = applicantId;
        this.matchScore = matchScore;
        this.jobTitle = jobTitle;
        this.employerName = employerName;
        this.applicantEmail = applicantEmail;
        this.applicantName = applicantName;
    }
}
