package com.jobjays.preference_updater.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationPreferenceDTO {
    private String notificationFrequency; // E.g., "DAILY", "WEEKLY", etc.

    // Constructors
    public NotificationPreferenceDTO() {}

    public NotificationPreferenceDTO(String frequency) {
        this.notificationFrequency = frequency;
    }
}
