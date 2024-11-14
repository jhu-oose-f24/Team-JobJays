package com.jobjays.applicant_job_matcher.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobjays.applicant_job_matcher.dto.JobPostDTO;
import com.jobjays.applicant_job_matcher.dto.MatchedJobDTO;
import com.jobjays.applicant_job_matcher.dto.ApplicantPreferenceDTO;
import com.jobjays.applicant_job_matcher.kafka.MatchedJobPublisher;
import com.jobjays.applicant_job_matcher.kafka.PreferencesStreamService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

            // If the score is above a threshold, consider it a match
            if (score > 15) { // Adjusted threshold to reflect higher scoring
                MatchedJobDTO matchedJob = new MatchedJobDTO(
                        jobPost.getJobId(),
                        applicantId,
                        score,
                        jobPost.getTitle(),
                        jobPost.getEmployerName(),
                        preference.getEmail(),
                        preference.getName()
                );
                matchedJobs.add(matchedJob);
            }
        }

        return matchedJobs;
    }

    private double calculateMatchScore(JobPostDTO jobPost, ApplicantPreferenceDTO preference) {
        double score = 0;

        // 1. Skills matching
        if (jobPost.getSkillsRequired() != null && preference.getSkills() != null) {
            long matchingSkills = jobPost.getSkillsRequired().stream()
                    .filter(preference.getSkills()::contains)
                    .count();
            score += matchingSkills * 2; // 2 points per matching skill for higher impact
        }

        // 2. Job title matching
        if (preference.getJobTitles() != null && preference.getJobTitles().contains(jobPost.getTitle())) {
            score += 10; // Increased weight for exact job title match
        }

        // 3. Industry matching
        if (preference.getIndustries() != null && preference.getIndustries().contains(jobPost.getIndustry())) {
            score += 5; // Increased to 5 points for industry match
        }

        // 4. Location matching
        if (preference.getLocations() != null && jobPost.getLocation() != null) {
            boolean cityMatch = preference.getLocations().stream()
                    .anyMatch(location -> location.getCity().equals(jobPost.getLocation().getCity()));
            boolean stateMatch = preference.getLocations().stream()
                    .anyMatch(location -> location.getState().equals(jobPost.getLocation().getState()));
            score += cityMatch ? 10 : stateMatch ? 5 : 0; // Higher points for city match, fallback to state
        }

        // 5. Job type matching
        if (preference.getJobTypes() != null && preference.getJobTypes().contains(jobPost.getJobType())) {
            score += 3; // Increased weight for job type match
        }

        // 6. Work timing matching
        if (preference.getWorkTimings() != null && preference.getWorkTimings().contains(jobPost.getWorkTiming())) {
            score += 3; // Increased weight for work timing match
        }

        // 7. Salary match
        if (preference.getMinMonthlySalary() <= jobPost.getMinSalary()) {
            score += 8; // Increased to reward salary alignment
        }

        return score;
    }
}
