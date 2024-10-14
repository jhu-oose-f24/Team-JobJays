package com.jobjays.applicant_job_matcher.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobjays.applicant_job_matcher.dto.JobPostDTO;
import com.jobjays.applicant_job_matcher.dto.MatchedJobDTO;
import com.jobjays.applicant_job_matcher.dto.ApplicantPreferenceDTO;
import com.jobjays.applicant_job_matcher.kafka.MatchedJobPublisher;
import com.jobjays.applicant_job_matcher.kafka.PreferencesStreamService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JobMatcherService {
    private final ObjectMapper objectMapper;
    private final PreferencesStreamService preferencesStreamService;
    private final MatchedJobPublisher matchedJobPublisher;

    public JobMatcherService(ObjectMapper objectMapper,
                             PreferencesStreamService preferencesStreamService,
                             MatchedJobPublisher matchedJobPublisher) {
        this.objectMapper = objectMapper;
        this.preferencesStreamService = preferencesStreamService;
        this.matchedJobPublisher = matchedJobPublisher;
    }

    @KafkaListener(topics = "new_jobs", groupId = "job-matcher-group")
    public void consumeJobPost(String message) {
        try {
            JobPostDTO jobPost = objectMapper.readValue(message, JobPostDTO.class);
            System.out.println("Consumed new job post: " + jobPost.getTitle());

            // Retrieve all preferences from Kafka Streams
            Map<String, ApplicantPreferenceDTO> preferences = preferencesStreamService.getAllPreferences();

            // Match the job post with applicant preferences
            List<MatchedJobDTO> matchedJobs = matchJobToApplicants(jobPost, preferences);

            // Publish matched jobs to the 'matched_jobs' topic
            for (MatchedJobDTO matchedJob : matchedJobs) {
                matchedJobPublisher.publishMatchedJob(matchedJob);
                System.out.println("Published matched job for applicant: " + matchedJob.getApplicantId());
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to process job post: " + message);
        }
    }

    private List<MatchedJobDTO> matchJobToApplicants(JobPostDTO jobPost, Map<String, ApplicantPreferenceDTO> preferences) {
        List<MatchedJobDTO> matchedJobs = new ArrayList<>();

        // Iterate through each preference and calculate the match score
        for (Map.Entry<String, ApplicantPreferenceDTO> entry : preferences.entrySet()) {
            String applicantId = entry.getKey();
            ApplicantPreferenceDTO preference = entry.getValue();
            double score = calculateMatchScore(jobPost, preference);

            // If the score is above a threshold (e.g., 10), consider it a match
            if (score > 10) {
                MatchedJobDTO matchedJob = new MatchedJobDTO(
                        jobPost.getJobId(),
                        applicantId,
                        score,
                        jobPost.getTitle(),
                        jobPost.getEmployerName(),
                        preference.getEmail(), // assuming email is in the DTO
                        preference.getName() // assuming name is in the DTO
                );
                matchedJobs.add(matchedJob);
            }
        }

        return matchedJobs;
    }

    private double calculateMatchScore(JobPostDTO jobPost, ApplicantPreferenceDTO preference) {
        double score = 0;

        // Example scoring criteria:
        // 1. Skills matching
        if (jobPost.getTags() != null && preference.getSkills() != null) {
            long matchingSkills = jobPost.getTags().stream()
                    .filter(preference.getSkills()::contains)
                    .count();
            score += matchingSkills; // 1 point per matching skill
        }

        // 2. Job title matching
        if (preference.getJobTitles() != null && preference.getJobTitles().contains(jobPost.getTitle())) {
            score += 5; // e.g., 3 points for job title match
        }

        // 3. Industry matching
        if (preference.getIndustries() != null && preference.getIndustries().contains(jobPost.getIndustry())) {
            score += 2; // e.g., 2 points for industry match
        }

        // 4. Location matching
        if (preference.getLocations() != null) {
            score += preference.getLocations().stream()
                    .anyMatch(location -> location.getCity().equals(jobPost.getLocation().getCity())) ? 5 : 0; // Max points for city match
        }

        // 5. Job type and work timing matching
        if (preference.getJobTypes() != null && preference.getJobTypes().contains(jobPost.getJobType())) {
            score += 1; // 1 point for job type match
        }
        if (preference.getWorkTimings() != null && preference.getWorkTimings().contains(jobPost.getWorkTiming())) {
            score += 1; // 1 point for work timing match
        }

        // 6. Salary check
        if (preference.getMinMonthlySalary() <= jobPost.getSalary()) {
            score += 3; // e.g., 3 points if the job salary meets the preference
        }

        return score;
    }
}
