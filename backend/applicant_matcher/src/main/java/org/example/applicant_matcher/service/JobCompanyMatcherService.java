package org.example.applicant_matcher.service;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.applicant_matcher.dto.JobDTO;
import org.example.applicant_matcher.dto.ApplicantPreferenceDTO;
import org.example.applicant_matcher.dto.MatchDTO;
import org.example.applicant_matcher.kafka.MatchedJobPublisher;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
@Service
public class JobCompanyMatcherService {

    private final ObjectMapper objectMapper;
    private final PreferencesStreamService preferencesStreamService;
    private final MatchedJobPublisher matchedJobPublisher;

    public JobCompanyMatcherService(ObjectMapper objectMapper,
                                    PreferencesStreamService preferencesStreamService,
                                    MatchedJobPublisher matchedJobPublisher) {
        this.objectMapper = objectMapper;
        this.preferencesStreamService = preferencesStreamService;
        this.matchedJobPublisher = matchedJobPublisher;
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
            double matchPercentage = calculateSkillMatchPercentage(jobPost.getSkillsRequired(), preference.getSkills());

            // 只有当匹配度达到或超过 60% 时，才将候选人添加到匹配列表中
            if (matchPercentage >= 60.0) {
                MatchDTO match = new MatchDTO(
                        jobPost.getJobId(),
                        entry.getKey(), // applicantId
                        matchPercentage,
                        jobPost.getTitle(),
                        jobPost.getEmployerName(),
                        preference.getEmail(),
                        preference.getName(),
                        jobPost.getEmployerEmail()
                );
                matchedApplicants.add(match);
                System.out.println("Matched applicant: " + match);
            }
        }

        return matchedApplicants;
    }

//
//    private List<ApplicantPreferenceDTO> matchJobToApplicants(JobDTO jobPost, Map<String, ApplicantPreferenceDTO> preferences) {
//        List<ApplicantPreferenceDTO> matchedApplicants = new ArrayList<>();
//
//        for (Map.Entry<String, ApplicantPreferenceDTO> entry : preferences.entrySet()) {
//            ApplicantPreferenceDTO preference = entry.getValue();
//            double matchPercentage = calculateSkillMatchPercentage(jobPost.getSkillsRequired(), preference.getSkills());
//
//            if (matchPercentage >= 60.0) {
//                matchedApplicants.add(preference);
//            }
//        }
//
//        return matchedApplicants;
//    }



    private double calculateSkillMatchPercentage(List<String> requiredSkills, List<String> applicantSkills) {
        long matchingSkillsCount = requiredSkills.stream()
                .filter(applicantSkills::contains)
                .count();
        return (double) matchingSkillsCount / requiredSkills.size() * 100;
    }
}