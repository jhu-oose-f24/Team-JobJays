package org.example.applicant_matcher.dto;

import lombok.Data;

@Data
public class MatchDTO {
    private Long jobId;
    private String applicantId;
    private Double matchScore;
    private String jobTitle;
    private String employerName;
    private String applicantEmail;
    private String applicantName;
    private String employerEmail;

    public MatchDTO() {}

    public MatchDTO(Long jobId, String applicantId, Double matchScore, String jobTitle,
                         String employerName, String applicantEmail, String applicantName, String employerEmail) {
        this.jobId = jobId;
        this.applicantId = applicantId;
        this.matchScore = matchScore;
        this.jobTitle = jobTitle;
        this.employerName = employerName;
        this.applicantEmail = applicantEmail;
        this.applicantName = applicantName;
        this.employerEmail = employerEmail;
    }
}
