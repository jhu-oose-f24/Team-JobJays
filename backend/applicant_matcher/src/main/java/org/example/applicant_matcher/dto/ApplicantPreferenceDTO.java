package org.example.applicant_matcher.dto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class ApplicantPreferenceDTO {
    private Long applicantId;
    private List<String> industries;
    private List<String> jobTitles;
    private List<String> skills;
    private Double minMonthlySalary;
//    private List<LocationDTO> locations;
    private List<String> jobTypes; // E.g., "on-site", "hybrid", "remote"
    private List<String> workTimings; // E.g., "full-time", "part-time", "flexible"
//    private NotificationPreferenceDTO notificationPreference;
    private String email;
    private String name;

    // Constructors


    public ApplicantPreferenceDTO(Long applicantId, String email, String name, List<String> industries, List<String> jobTitles, List<String> skills,
                                  Double minMonthlySalary, List<String> jobTypes,
                                  List<String> workTimings) {
        this.applicantId = applicantId;
        this.email = email;
        this.name = name;
        this.industries = industries;
        this.jobTitles = jobTitles;
        this.skills = skills;
        this.minMonthlySalary = minMonthlySalary;
        this.jobTypes = jobTypes;
        this.workTimings = workTimings;
    }
}
