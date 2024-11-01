//package com.jobjays.notification_sender.service;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.jobjays.notification_sender.dto.MatchedJobDTO;
//import jakarta.mail.MessagingException;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class KafkaConsumerService {
//    private final EmailService emailService;
//    private final ObjectMapper objectMapper;
//
//    public KafkaConsumerService(EmailService emailService, ObjectMapper objectMapper) {
//        this.emailService = emailService;
//        this.objectMapper = objectMapper;
//    }
//
//    @KafkaListener(topics = "send_notification", groupId = "notification-sender-group")
//    public void listen(String messageJson) throws MessagingException {
//                try {
//                    // Deserialize JSON message into a list of MatchedJobDTO
//                    MatchedJobDTO job = objectMapper.readValue(messageJson,  MatchedJobDTO.class);
//
//                    if (job == null) {
//                        System.out.println("Invalid message received from Kafka. 'jobs' list is missing or empty.");
//                        return;
//                    }
//
//
//                        String to = job.getApplicantEmail();
//                        String userName = job.getApplicantName();
//                        String subject = String.format("Job Recommendations for %s", job.getApplicantName());
//                        String templateName = "job_recommendation";
//
//                        // Prepare template data
//                    // Prepare template data
//                    Map<String, Object> templateData = Map.of(
//                            "userName", userName,
//                            "jobTitle", job.getJobTitle(),
//                            "employerName", job.getEmployerName(),
//                            "jobId", job.getJobId()
//                    );
//
//                        // Proceed with sending the email if all required fields are present
//                        emailService.sendEmail(to, subject, templateName, templateData);
//                        System.out.println("Processed message from Kafka and sent email to " + to + " with subject '" + subject + "'.");
//
//                        System.out.println("Consumed matched job: " + job.getJobTitle() + " for applicant " + job.getApplicantEmail());
//                    // Extract common data from the first job (assuming all jobs are for the same applicant)
//
//                } catch (Exception e) {
//                    System.out.println("Failed to process message from Kafka: " + e.getMessage());
//                    e.printStackTrace();
//                }
//    }
//}
package com.jobjays.notification_sender.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobjays.notification_sender.dto.MatchedJobDTO;
import jakarta.mail.MessagingException;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class KafkaConsumerService {

    private final EmailService emailService;
    private final ObjectMapper objectMapper;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Value("${kafka.error.topic}")
    private String errorTopic;

    public KafkaConsumerService(EmailService emailService, ObjectMapper objectMapper, KafkaTemplate<String, String> kafkaTemplate) {
        this.emailService = emailService;
        this.objectMapper = objectMapper;
        this.kafkaTemplate = kafkaTemplate;
    }

    @KafkaListener(topics = "send_notification", groupId = "notification-sender-group")
    public void listen(String messageJson) {
        try {
            // Deserialize JSON message into MatchedJobDTO
            MatchedJobDTO job = objectMapper.readValue(messageJson, MatchedJobDTO.class);

            if (job == null) {
                throw new IllegalArgumentException("Invalid message received. MatchedJobDTO deserialization failed.");
            }

            String to = job.getApplicantEmail();
            String userName = job.getApplicantName();
            String subject = String.format("Job Recommendations for %s", job.getApplicantName());
            String templateName = "job_recommendation";

            // Prepare template data
            Map<String, Object> templateData = Map.of(
                    "userName", userName,
                    "jobTitle", job.getJobTitle(),
                    "employerName", job.getEmployerName(),
                    "jobId", job.getJobId()
            );

            // Send email
            emailService.sendEmail(to, subject, templateName, templateData);
            System.out.println("Sent email to " + to + " with subject '" + subject + "'.");

        } catch (Exception e) {
            System.out.println("Failed to process message from Kafka: " + e.getMessage());
            sendToErrorTopic(messageJson, e.getMessage());
        }
    }

    private void sendToErrorTopic(String messageJson, String errorMessage) {
        try {
            // Construct error message with the original message and error details
            String errorPayload = objectMapper.writeValueAsString(
                    Map.of("originalMessage", messageJson, "error", errorMessage)
            );
            kafkaTemplate.send(errorTopic, errorPayload);
            System.out.println("Sent failed message to error topic: " + errorTopic);

        } catch (Exception e) {
            System.err.println("Failed to send message to error topic: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
