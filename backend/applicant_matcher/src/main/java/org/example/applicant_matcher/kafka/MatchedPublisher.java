package org.example.applicant_matcher.kafka;

import org.example.applicant_matcher.dto.MatchDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class MatchedPublisher {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;
    private static final String TOPIC = "send_notification";

    public MatchedPublisher(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void publishMatchedJob(MatchDTO matchedJob) {
        try {
            String message = objectMapper.writeValueAsString(matchedJob);
            kafkaTemplate.send(TOPIC, message);
            System.out.println("Published matched job: " + matchedJob.getJobTitle() + " for applicant " + matchedJob.getApplicantEmail());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
