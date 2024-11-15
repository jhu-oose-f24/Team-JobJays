package org.example.applicant_matcher.dto;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class JobDTO {
    private Long jobId;
    private String title;
    private String description;
    @JsonAnyGetter
    private Double minSalary;
    private List<String> skillsRequired;
    private String industry;
    private String jobType; // E.g., "on-site", "remote", "hybrid"
    private String employerName;
    private LocalDateTime postedDate;
    private List<String> tags;
    private String workTiming;
    private String  employerEmail;

    public JobDTO() {}

    public JobDTO(Long jobId, String title, String description, Double salary,
                      List<String> skillsRequired, String industry, String jobType, String employerName,
                      LocalDateTime postedDate, List<String> tags, String workTiming, String  employerEmail) {
        this.jobId = jobId;
        this.title = title;
        this.description = description;
        this.minSalary = salary;
        this.skillsRequired = skillsRequired;
        this.industry = industry;
        this.jobType = jobType;
        this.employerName = employerName;
        this.postedDate = postedDate;
        this.tags = tags;
        this.workTiming = workTiming;
        this.employerEmail = employerEmail;
    }


}
