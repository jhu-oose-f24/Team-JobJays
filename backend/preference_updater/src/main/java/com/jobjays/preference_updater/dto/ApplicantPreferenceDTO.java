package com.jobjays.preference_updater.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ApplicantPreferenceDTO {

    private Long applicantId;
    private String email;
    private String name;
    private List<String> industries;
    private List<String> jobTitles;
    private List<String> skills;
    private Double minMonthlySalary;
    private List<LocationDTO> locations;
    private List<String> jobTypes; // E.g., "on-site", "hybrid", "remote"
    private List<String> workTimings; // E.g., "full-time", "part-time", "flexible"
    private NotificationPreferenceDTO notificationPreference;

    // Constructors
    public ApplicantPreferenceDTO() {}

    public ApplicantPreferenceDTO(Long applicantId, List<String> industries, List<String> jobTitles, List<String> skills,
                                  Double minMonthlySalary, List<LocationDTO> locations, List<String> jobTypes,
                                  List<String> workTimings, NotificationPreferenceDTO notificationPreference) {
        this.applicantId = applicantId;
        this.industries = industries;
        this.jobTitles = jobTitles;
        this.skills = skills;
        this.minMonthlySalary = minMonthlySalary;
        this.locations = locations;
        this.jobTypes = jobTypes;
        this.workTimings = workTimings;
        this.notificationPreference = notificationPreference;
    }
}
