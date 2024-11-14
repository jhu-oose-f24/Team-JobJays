package org.example.applicant_matcher.service;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.applicant_matcher.dto.JobDTO;
import org.example.applicant_matcher.dto.MatchDTO;
import org.example.applicant_matcher.dto.AppDTO;
import org.example.applicant_matcher.matchalgo.DesToKeys;
import org.example.applicant_matcher.kafka.MatchedPublisher;
import org.example.applicant_matcher.kafka.ResumesStreamService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class FinderResponseService {
    private final ObjectMapper objectMapper;
    private final ResumesStreamService resumesStreamService;
    private final MatchedPublisher matchedPublisher;

    public FinderResponseService(ObjectMapper objectMapper, ResumesStreamService resumesStreamService, MatchedPublisher matchedPublisher) {
        this.objectMapper = objectMapper;
        this.resumesStreamService = resumesStreamService;
        this.matchedPublisher = matchedPublisher;
    }

    @KafkaListener(topics = "new_jobs", groupId = "find-response")
    public void consumeJobPost(String message) {
        try {
            JobDTO jobPost = objectMapper.readValue(message, JobDTO.class);

            // Retrieve all preferences from Kafka Streams
            Map<String, AppDTO> preferences = resumesStreamService.getAllPreferences();

            // Match the job post with applicant preferences
            List<MatchDTO> matchedJobs = matchToApplicants(jobPost, preferences);

            // Publish matched jobs to the 'matched_jobs' topic
            for (MatchDTO matchedJob : matchedJobs) {
                matchedPublisher.publishMatchedJob(matchedJob);
                System.out.println("User find: " + matchedJob.getApplicantId());
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to process job post: " + message);
        }
    }

    private List<MatchDTO> matchToApplicants(JobDTO job, Map<String, AppDTO> preferences) {
        List<MatchDTO> matchedJobs = new ArrayList<>();

        // Iterate through each preference and calculate the match score
        for (Map.Entry<String, AppDTO> entry : preferences.entrySet()) {
            String applicantId = entry.getKey();
            AppDTO preference = entry.getValue();
            String des = job.getDescription();
            String resume = preference.getResume();
            Map<String, Integer> keywordFrequency = DesToKeys.extractKeywordsWithFrequency(des);
            Map<String, Integer> result = DesToKeys.matchKeywordsInPdf(resume, keywordFrequency);
            double score = DesToKeys.compareKeywordFrequencies(keywordFrequency, result);

            if (score > 30) { // 可以调节
                MatchDTO matchedJob = new MatchDTO(
                        job.getJobId(),
                        applicantId,
                        score,
                        job.getTitle(),
                        job.getEmployerName(),
                        preference.getEmail(),
                        preference.getName(),
                        job.getEmployerEmail()
                );
                matchedJobs.add(matchedJob);
            }
        }

        return matchedJobs;
    }

}
