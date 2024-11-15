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

            String emailContent = generateEmailContent(notification);
            sendEmail(notification.getEmployerEmail(), "Matching Applicants for Your Job", emailContent);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void sendEmail(String recipient, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipient);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }

    private String generateEmailContent(CompanyNotificationDTO notification) {
        StringBuilder content = new StringBuilder("The following applicants matched your job: " + notification.getJobTitle() + "\n\n");
        for (MatchDTO applicant : notification.getMatchedApplicants()) {
            content.append("Name: ").append(applicant.getApplicantName())
                    .append(", Email: ").append(applicant.getApplicantEmail()).append("\n");
        }
        return content.toString();
    }
}