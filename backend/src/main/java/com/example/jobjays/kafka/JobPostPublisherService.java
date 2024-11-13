package com.example.jobjays.kafka;

import com.example.jobjays.model.JobPost;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class JobPostPublisherService {
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final ObjectMapper objectMapper;
    private static final String NEW_JOBS_TOPIC = "new_jobs";

    public JobPostPublisherService(@Qualifier("kafkaTemplateObject") KafkaTemplate<String, Object> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void publishJobPost(JobPost jobPost) {
        try {
            // Convert the JobPost to a DTO and then to JSON
            JobPostDTO jobPostDTO = convertToDTO(jobPost);
            String jobPostJson = objectMapper.writeValueAsString(jobPostDTO);

            // Send the JSON message to the Kafka topic
            kafkaTemplate.send(NEW_JOBS_TOPIC, jobPostJson);
            System.out.println("Published job post to Kafka: " + jobPost.getTitle());
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to publish job post: " + jobPost.getTitle());
        }
    }

    private JobPostDTO convertToDTO(JobPost jobPost) {
        String employerName = jobPost.getEmployer() != null ?  jobPost.getEmployer().getName() : "Unknown";

        return new JobPostDTO(
                jobPost.getID(),
                jobPost.getTitle(),
                jobPost.getDescription(),
                 jobPost.getLocation(),
                jobPost.getMinSalary(),
                jobPost.getMaxSalary(),
                employerName,
                jobPost.getPostedDate(),
                jobPost.getClosedDate(),
                jobPost.getTags(),
                jobPost.getJobType(),
                jobPost.getIndustry(),
                jobPost.getWorkTiming(),
                jobPost.getSkillsRequired()
        );
    }
}
