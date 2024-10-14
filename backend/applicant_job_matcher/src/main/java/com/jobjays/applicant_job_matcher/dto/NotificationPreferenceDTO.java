package com.jobjays.applicant_job_matcher.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationPreferenceDTO {
    private String frequency; // E.g., "DAILY", "WEEKLY", etc.

    // Constructors
    public NotificationPreferenceDTO() {}

    public NotificationPreferenceDTO(String frequency) {
        this.frequency = frequency;
    }
}