package org.example.applicant_matcher.kafka;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.example.applicant_matcher.dto.CompanyNotificationDTO;
import org.example.applicant_matcher.dto.ApplicantPreferenceDTO;
import org.example.applicant_matcher.dto.JobDTO;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.List;

@Component
public class MatchedJobPublisher {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public MatchedJobPublisher(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void publishMatchedApplicantToCompany(JobDTO jobPost, List<ApplicantPreferenceDTO> matchedApplicants) {
        try {
            if (jobPost.getEmployerEmail() == null || jobPost.getEmployerEmail().isEmpty()) {
                throw new IllegalArgumentException("Employer email is missing for job post: " + jobPost.getJobId());
            }

            CompanyNotificationDTO notification = new CompanyNotificationDTO(
                    String.valueOf(jobPost.getJobId()),
                    jobPost.getTitle(),
                    jobPost.getEmployerEmail(),
                    matchedApplicants
            );
            kafkaTemplate.send("matched_applicants_for_company", objectMapper.writeValueAsString(notification));
            System.out.println("Notification published for job: " + jobPost.getJobId());
        } catch (Exception e) {
            System.err.println("Failed to publish notification for job post: " + jobPost.getJobId());
            e.printStackTrace();
            // 可以考虑重试或将失败记录到日志中
        }
    }
}