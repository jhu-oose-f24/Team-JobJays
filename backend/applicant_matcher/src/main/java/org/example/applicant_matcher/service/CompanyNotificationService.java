package org.example.applicant_matcher.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.applicant_matcher.dto.CompanyNotificationDTO;
import org.example.applicant_matcher.dto.ApplicantPreferenceDTO;
import org.example.applicant_matcher.dto.MatchDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class CompanyNotificationService {

    private final JavaMailSender mailSender;
    private final ObjectMapper objectMapper;

    @Autowired
    public CompanyNotificationService(JavaMailSender mailSender, ObjectMapper objectMapper) {
        this.mailSender = mailSender;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "matched_applicants_for_company", groupId = "company-notification-group")
    public void notifyCompany(String message) {
        try {
            CompanyNotificationDTO notification = objectMapper.readValue(message, CompanyNotificationDTO.class);

            System.out.println("Received Kafka message: " + notification);

            String emailContent = generateEmailContent(notification);

            System.out.println("Generated email content (for testing, not sent):\n" + emailContent);

            sendEmail(notification.getEmployerEmail(), "Matching Applicants for Your Job", emailContent);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendEmail(String recipient, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipient);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }

    public String generateEmailContent(CompanyNotificationDTO notification) {
        StringBuilder content = new StringBuilder();
        content.append("The following applicants matched your job: ").append(notification.getJobTitle()).append("\n\n");

        for (MatchDTO applicant : notification.getMatchedApplicants()) {
            content.append("Name: ").append(applicant.getApplicantName())
                    .append(", Email: ").append(applicant.getApplicantEmail())
                    .append(", Skill Match Score: ").append(String.format("%.2f", applicant.getMatchScore() * 0.6))
                    .append(", Resume Match Score: ").append(String.format("%.2f", applicant.getMatchScore() * 0.4))
                    .append(", Total Score: ").append(String.format("%.2f", applicant.getMatchScore()))
                    .append("\n");
        }
        return content.toString();
    }
}