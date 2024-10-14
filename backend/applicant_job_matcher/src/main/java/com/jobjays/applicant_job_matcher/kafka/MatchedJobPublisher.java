package com.jobjays.applicant_job_matcher.kafka;

import com.jobjays.applicant_job_matcher.dto.MatchedJobDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class MatchedJobPublisher {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;
    private static final String TOPIC = "send_notification";

    public MatchedJobPublisher(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void publishMatchedJob(MatchedJobDTO matchedJob) {
        try {
            String message = objectMapper.writeValueAsString(matchedJob);
            kafkaTemplate.send(TOPIC, message);
            System.out.println("Published matched job: " + matchedJob.getJobTitle() + " for applicant " + matchedJob.getApplicantEmail());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
