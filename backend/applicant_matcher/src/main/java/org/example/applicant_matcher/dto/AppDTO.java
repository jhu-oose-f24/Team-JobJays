package org.example.applicant_matcher.dto;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class AppDTO {
    private Long id;
    private String name;
    private String email;
    private String resume;

    public AppDTO() {
    }
    public AppDTO(Long applicantId, String email, String name, List<String> industries, List<String> jobTitles, List<String> skills,
                                  Double minMonthlySalary, List<LocationDTO> locations, List<String> jobTypes,
                                  List<String> workTimings, NotificationPreferenceDTO notificationPreference) {
        this.applicantId = applicantId;
        this.email = email;
        this.name = name;
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
