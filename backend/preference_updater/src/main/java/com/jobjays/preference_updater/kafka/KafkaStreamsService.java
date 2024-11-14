package com.jobjays.preference_updater.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobjays.preference_updater.dto.ApplicantPreferenceDTO;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.Produced;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class KafkaStreamsService {
    private final ObjectMapper objectMapper;

    private static final String PREFERENCES_TOPIC = "applicant_preferences";

    public KafkaStreamsService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Bean
    public KStream<String, String> processPreferences(@Qualifier("preferenceStreamsBuilder") StreamsBuilder builder) {
        // Create a stream from the preference update requests
        KStream<String, String> preferenceUpdateStream = builder.stream(PREFERENCES_TOPIC);

        // Process the updates and send them to applicant_preferences
        preferenceUpdateStream
                .mapValues(this::processPreferenceUpdate)
                .to(PREFERENCES_TOPIC, Produced.with(Serdes.String(), Serdes.String()));


            // Process the incoming messages
            preferenceUpdateStream.foreach((key, value) -> {
                System.out.println("Stream received - Key: " + key + ", Value: " + value);
                // Additional processing logic here...
            });

        return preferenceUpdateStream;
    }

    private String processPreferenceUpdate(String message) {
        try {
            ApplicantPreferenceDTO preference = objectMapper.readValue(message, ApplicantPreferenceDTO.class);
            System.out.println("Processing preference update for userId: " + preference.getApplicantId());
            return objectMapper.writeValueAsString(preference);  // Return updated preference for downstream processing
        } catch (Exception e) {
            e.printStackTrace();
            return null;  // Handle the error
        }
    }
}
