package com.example.jobjays.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "applicant_preference")
public class ApplicantPreference {

    // Applicant accessible
    @Setter
    @Getter
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "applicant_id", referencedColumnName = "applicantId", unique = true)
    private Applicant applicant;
    // Getters and setters
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Setter
//    @Getter
//    @Column(name = "applicant_id", nullable = false, unique = true)
//    private Long applicantId;

    @Setter
    @Getter
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "applicant_industries", joinColumns = @JoinColumn(name = "applicant_preference_id"))
    @Column(name = "industry")
    private List<String> industries;

    @Setter
    @Getter
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "applicant_job_titles", joinColumns = @JoinColumn(name = "applicant_preference_id"))
    @Column(name = "job_title")
    private List<String> jobTitles;

    @Setter
    @Getter
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "applicant_skills", joinColumns = @JoinColumn(name = "applicant_preference_id"))
    @Column(name = "skill")
    private List<String> skills; // New field for skills

    @Setter
    @Getter
    @Column(name = "min_monthly_salary")
    private Double minMonthlySalary;

    @Setter
    @Getter
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "applicant_locations", joinColumns = @JoinColumn(name = "applicant_preference_id"))
    @AttributeOverrides({
            @AttributeOverride(name = "country", column = @Column(name = "country")),
            @AttributeOverride(name = "state", column = @Column(name = "state")),
            @AttributeOverride(name = "city", column = @Column(name = "city"))
    })
    private List<Location> locations;

    @Setter
    @Getter
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "applicant_job_types", joinColumns = @JoinColumn(name = "applicant_preference_id"))
    @Column(name = "job_type")
    private List<String> jobTypes; // E.g., "on-site", "hybrid", "remote"

    @Setter
    @Getter
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "applicant_work_timings", joinColumns = @JoinColumn(name = "applicant_preference_id"))
    @Column(name = "work_timing")
    private List<String> workTimings; // E.g., "full-time", "part-time", "flexible"

    @Embedded
    @Setter
    @Getter

    private NotificationPreference notificationPreference;

    // Constructors
    public ApplicantPreference() {}

    public ApplicantPreference(Applicant applicant, List<String> industries, List<String> jobTitles, List<String> skills,
                               Double minMonthlySalary, List<Location> locations, List<String> jobTypes,
                               List<String> workTimings, NotificationPreference notificationPreference) {
        this.applicant = applicant;
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
