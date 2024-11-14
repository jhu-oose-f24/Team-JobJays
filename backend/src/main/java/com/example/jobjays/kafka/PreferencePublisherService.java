package com.example.jobjays.kafka;

import com.example.jobjays.dto.prefence.LocationDto;
import com.example.jobjays.dto.prefence.NotificationPreferenceDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.jobjays.model.ApplicantPreference;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreferencePublisherService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;
    private static final String PREFERENCES_UPDATE_REQUESTS_TOPIC = "preference_update_requests";

    public PreferencePublisherService(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void publishApplicantPreference(ApplicantPreference preference) {
        try {
            // Map the ApplicantPreference entity to ApplicantPreferenceDTO
            ApplicantPreferenceDTO dto = mapToDTO(preference);

            // Convert DTO to JSON string
            String message = objectMapper.writeValueAsString(dto);

            // Publish the message to Kafka topic
            kafkaTemplate.send(PREFERENCES_UPDATE_REQUESTS_TOPIC, dto.getApplicantId().toString(), message);
            System.out.println("Published preference update request for userId: " + dto.getApplicantId());
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to publish preference update request for userId: " + preference.getApplicant().getID());
        }
    }

    // Method to map ApplicantPreference entity to ApplicantPreferenceDTO
    private ApplicantPreferenceDTO mapToDTO(ApplicantPreference preference) {
        return new ApplicantPreferenceDTO(
                preference.getApplicant().getID(),
                preference.getApplicant().getEmail(),
                preference.getApplicant().getName(),
                preference.getIndustries(),
                preference.getJobTitles(),
                preference.getSkills(),
                preference.getMinMonthlySalary(),
                preference.getLocations().stream().map(location -> new LocationDto(location.getCountry(),location.getState(),  location.getCountry())).toList(),
                preference.getJobTypes(),
                preference.getWorkTimings(),
                new NotificationPreferenceDto(
                        preference.getNotificationPreference().getNotificationFrequency()
                )
        );
    }
    @Data
    @AllArgsConstructor
    static  class ApplicantPreferenceDTO {
       public ApplicantPreferenceDTO  (ApplicantPreference preference) {
            this.applicantId = preference.getApplicant().getID();
            this.email = preference.getApplicant().getEmail();
            this.name = preference.getApplicant().getName();
            this.industries = preference.getIndustries();
            this.jobTitles = preference.getJobTitles();
            this.skills = preference.getSkills();
            this.minMonthlySalary = preference.getMinMonthlySalary();
            this.locations = preference.getLocations().stream().map(location -> new LocationDto(location.getCountry(), location.getState(), location.getCity())).toList();
            this.jobTypes = preference.getJobTypes();
            this.workTimings = preference.getWorkTimings();
            this.notificationPreference = new NotificationPreferenceDto(preference.getNotificationPreference().getNotificationFrequency());
        }
        private Long applicantId;
        private String email;
        private String name;
        private List<String> industries;
        private List<String> jobTitles;
        private List<String> skills;
        private Double minMonthlySalary;
        private List<LocationDto> locations;
        private List<String> jobTypes;
        private List<String> workTimings;
        private NotificationPreferenceDto notificationPreference;


    }



}
