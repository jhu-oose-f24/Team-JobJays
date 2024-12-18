package org.example.applicant_matcher.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.applicant_matcher.dto.ApplicantPreferenceDTO;
import org.example.applicant_matcher.dto.JobDTO;
import org.example.applicant_matcher.dto.MatchDTO;
import org.example.applicant_matcher.kafka.MatchedJobPublisher;
import org.example.applicant_matcher.matchalgo.DesToKeys;
import org.example.applicant_matcher.repository.ApplicantResumeRepository;
import org.example.applicant_matcher.model.ApplicantResume;
import org.example.applicant_matcher.service.ResumeFetcherService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@Service
public class JobCompanyMatcherService {

    private static final double MATCH_THRESHOLD = 30.0;
    private final ObjectMapper objectMapper;
    private final PreferencesStreamService preferencesStreamService;
    private final MatchedJobPublisher matchedJobPublisher;
    private final ResumeFetcherService resumeFetcherService;


    public JobCompanyMatcherService(
            ObjectMapper objectMapper,
            PreferencesStreamService preferencesStreamService,
            MatchedJobPublisher matchedJobPublisher,
            ResumeFetcherService resumeFetcherService
    ) {
        this.objectMapper = objectMapper;
        this.preferencesStreamService = preferencesStreamService;
        this.matchedJobPublisher = matchedJobPublisher;
        this.resumeFetcherService = resumeFetcherService;
    }

    @KafkaListener(topics = "new_jobs", groupId = "job-company-matcher-group")
    public void consumeJobPost(String message) {
        try {
            JobDTO jobPost = objectMapper.readValue(message, JobDTO.class);
            System.out.println("Consumed new job post: " + jobPost.getTitle());

            Map<String, ApplicantPreferenceDTO> preferences = preferencesStreamService.getAllPreferences();

            List<MatchDTO> matchedApplicants = matchJobToApplicants(jobPost, preferences);

            if (!matchedApplicants.isEmpty()) {
                matchedJobPublisher.publishMatchedApplicantToCompany(jobPost, matchedApplicants);
                System.out.println("Published matched applicants to company: " + jobPost.getEmployerEmail());
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to process job post: " + message);
        }
    }

    public List<MatchDTO> matchJobToApplicants(JobDTO jobPost, Map<String, ApplicantPreferenceDTO> preferences) {
        List<MatchDTO> matchedApplicants = new ArrayList<>();

        for (Map.Entry<String, ApplicantPreferenceDTO> entry : preferences.entrySet()) {
            ApplicantPreferenceDTO preference = entry.getValue();

            double skillMatchScore = calculateSkillMatchPercentage(
                    jobPost.getSkillsRequired(), preference.getSkills());

            if (skillMatchScore < 60.0) {
                continue;
            }

            Optional<byte[]> resumeData = resumeFetcherService.getResumeByUserId(preference.getApplicantId());
            if (resumeData.isEmpty()) {
                System.out.println("No resume found for applicant: " + preference.getApplicantId());
                continue;
            }

            String resumeText = DesToKeys.extractTextFromPdf(resumeData.get());
            if (resumeText.isEmpty()) {
                System.out.println("Failed to extract text from resume for applicant: " + preference.getApplicantId());
                continue;
            }

            Map<String, Integer> jobKeywords = DesToKeys.extractKeywordsWithFrequency(jobPost.getDescription());
            Map<String, Integer> resumeKeywords = DesToKeys.extractKeywordsWithFrequency(resumeText);
            double resumeMatchScore = DesToKeys.compareKeywordFrequencies(jobKeywords, resumeKeywords, 10, 0.1);

            double finalScore = skillMatchScore * 0.6 + resumeMatchScore * 0.4;

            if (finalScore < MATCH_THRESHOLD) {
                continue;
            }

            MatchDTO match = new MatchDTO(
                    jobPost.getJobId(),
                    entry.getKey(),
                    finalScore,
                    jobPost.getTitle(),
                    jobPost.getEmployerName(),
                    preference.getEmail(),
                    preference.getName(),
                    jobPost.getEmployerEmail()
            );

            matchedApplicants.add(match);
        }

        return matchedApplicants;
    }

    private double calculateSkillMatchPercentage(List<String> requiredSkills, List<String> applicantSkills) {
        if (requiredSkills == null || applicantSkills == null) {
            return 0.0;
        }

        long matchingSkillsCount = requiredSkills.stream()
                .filter(applicantSkills::contains)
                .count();

        return (double) matchingSkillsCount / requiredSkills.size() * 100;
    }

    private Optional<byte[]> fetchResumeByApplicantId(Long applicantId) {
        return applicantResumeRepository.findFirstByUserId(applicantId)
                .map(ApplicantResume::getFileData);
    }
}
