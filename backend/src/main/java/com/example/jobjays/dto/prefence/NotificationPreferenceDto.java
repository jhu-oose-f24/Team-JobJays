package com.example.jobjays.dto.prefence;

import com.example.jobjays.model.NotificationFrequency;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor // Add this annotation to generate a no-arg constructor

public  class NotificationPreferenceDto {

    public NotificationPreferenceDto( NotificationFrequency notificationFrequency) {
        this.notificationFrequency = notificationFrequency;
    }
    private NotificationFrequency notificationFrequency; // Represented as a string in the DTO for simplicity

}