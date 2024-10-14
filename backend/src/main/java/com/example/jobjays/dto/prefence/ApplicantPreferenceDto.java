package com.example.jobjays.dto.prefence;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@Data
@NoArgsConstructor // Add this to fix the deserialization error

public class ApplicantPreferenceDto {
    private Long applicantId;
    private List<String> industries;
    private List<String> jobTitles;
    private Double minMonthlySalary;
    private List<LocationDto> locations;
    private List<String> jobTypes;
    private List<String> workTimings;
    private NotificationPreferenceDto notificationPreference;
    // Getters and setters


}
