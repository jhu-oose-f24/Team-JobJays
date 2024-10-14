package com.jobjays.preference_updater.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobjays.preference_updater.dto.ApplicantPreferenceDTO;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;
    private static final String PREFERENCES_TOPIC = "applicant_preferences";

    public KafkaConsumerService(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "preference_update_requests", groupId = "preference-updater-group")
    public void consumePreferenceUpdate(ConsumerRecord<String, String> record) {
        try {
            // Deserialize message
            String message = record.value();
            ApplicantPreferenceDTO preference = objectMapper.readValue(message, ApplicantPreferenceDTO.class);
            System.out.println("Consumed preference update for userId: " + preference.getApplicantId());

            // Process and publish updated preference
            String value = objectMapper.writeValueAsString(preference);
            kafkaTemplate.send(PREFERENCES_TOPIC, preference.getApplicantId().toString(), value);
            System.out.println("Published updated preference to " + PREFERENCES_TOPIC + " for userId: " + preference.getApplicantId());
        } catch (Exception e) {
            e.printStackTrace();
            kafkaTemplate.send("invalid_preference_updates", record.value());
            System.err.println("Failed to process message: " + record.value());
        }
    }
}
