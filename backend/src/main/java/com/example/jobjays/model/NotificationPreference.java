package com.example.jobjays.model;

import com.example.jobjays.dto.prefence.NotificationPreferenceDto;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Embeddable
public class NotificationPreference {

    @Enumerated(EnumType.STRING)
    private NotificationFrequency notificationFrequency;

    // Constructors
    public NotificationPreference() {
    }

    public NotificationPreference(NotificationFrequency notificationFrequency) {
        this.notificationFrequency = notificationFrequency;
    }

    // Getters and setters
    public NotificationFrequency getNotificationFrequency() {
        return notificationFrequency;
    }

    public void setNotificationFrequency(NotificationFrequency notificationFrequency) {
        this.notificationFrequency = notificationFrequency;
    }

    public NotificationPreferenceDto toDto() {
        return new NotificationPreferenceDto(notificationFrequency);
    }
}
