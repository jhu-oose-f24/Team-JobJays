package org.example.applicant_matcher.service;

import org.example.applicant_matcher.dto.Resume;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    private static final String TOPIC = "company-notifications";

    public void notifyCompany(Long companyId, List<Resume> matchingResumes) {
        String notificationMessage = buildNotificationMessage(companyId, matchingResumes);
        kafkaTemplate.send(TOPIC, notificationMessage);
    }

    private String buildNotificationMessage(Long companyId, List<Resume> matchingResumes) {
        StringBuilder message = new StringBuilder();
        message.append("Company ID: ").append(companyId).append("\n");
        message.append("Matching applicants:\n");
        for (Resume resume : matchingResumes) {
            message.append(" - ").append(resume.getUserId()).append(": ").append(resume.getSkills()).append("\n");
        }
        return message.toString();
    }
}
