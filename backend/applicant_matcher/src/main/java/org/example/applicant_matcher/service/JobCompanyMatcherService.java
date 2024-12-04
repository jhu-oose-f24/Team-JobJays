//package org.example.applicant_matcher.service;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.example.applicant_matcher.dto.JobDTO;
//import org.example.applicant_matcher.dto.ApplicantPreferenceDTO;
//import org.example.applicant_matcher.dto.MatchDTO;
//import org.example.applicant_matcher.kafka.MatchedJobPublisher;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//@Service
//public class JobCompanyMatcherService {
//
//    private final ObjectMapper objectMapper;
//    private final PreferencesStreamService preferencesStreamService;
//    private final MatchedJobPublisher matchedJobPublisher;
//
//    public JobCompanyMatcherService(ObjectMapper objectMapper,
//                                    PreferencesStreamService preferencesStreamService,
//                                    MatchedJobPublisher matchedJobPublisher) {
//        this.objectMapper = objectMapper;
//        this.preferencesStreamService = preferencesStreamService;
//        this.matchedJobPublisher = matchedJobPublisher;
//    }
//
//    @KafkaListener(topics = "new_jobs", groupId = "job-company-matcher-group")
//    public void consumeJobPost(String message) {
//        try {
//            JobDTO jobPost = objectMapper.readValue(message, JobDTO.class);
//            System.out.println("Consumed new job post: " + jobPost.getTitle());
//
//            Map<String, ApplicantPreferenceDTO> preferences = preferencesStreamService.getAllPreferences();
//            List<MatchDTO> matchedApplicants = matchJobToApplicants(jobPost, preferences);
//
//            if (!matchedApplicants.isEmpty()) {
//                matchedJobPublisher.publishMatchedApplicantToCompany(jobPost, matchedApplicants);
//                System.out.println("Published matched applicants to company: " + jobPost.getEmployerEmail());
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            System.err.println("Failed to process job post: " + message);
//        }
//    }
//    public List<MatchDTO> matchJobToApplicants(JobDTO jobPost, Map<String, ApplicantPreferenceDTO> preferences) {
//        List<MatchDTO> matchedApplicants = new ArrayList<>();
//
//        for (Map.Entry<String, ApplicantPreferenceDTO> entry : preferences.entrySet()) {
//            ApplicantPreferenceDTO preference = entry.getValue();
//            double matchPercentage = calculateSkillMatchPercentage(jobPost.getSkillsRequired(), preference.getSkills());
//
//            // 只有当匹配度达到或超过 60% 时，才将候选人添加到匹配列表中
//            if (matchPercentage >= 60.0) {
//                MatchDTO match = new MatchDTO(
//                        jobPost.getJobId(),
//                        entry.getKey(), // applicantId
//                        matchPercentage,
//                        jobPost.getTitle(),
//                        jobPost.getEmployerName(),
//                        preference.getEmail(),
//                        preference.getName(),
//                        jobPost.getEmployerEmail()
//                );
//                matchedApplicants.add(match);
//                System.out.println("Matched applicant: " + match);
//            }
//        }
//
//        return matchedApplicants;
//    }
//
////
////    private List<ApplicantPreferenceDTO> matchJobToApplicants(JobDTO jobPost, Map<String, ApplicantPreferenceDTO> preferences) {
////        List<ApplicantPreferenceDTO> matchedApplicants = new ArrayList<>();
////
////        for (Map.Entry<String, ApplicantPreferenceDTO> entry : preferences.entrySet()) {
////            ApplicantPreferenceDTO preference = entry.getValue();
////            double matchPercentage = calculateSkillMatchPercentage(jobPost.getSkillsRequired(), preference.getSkills());
////
////            if (matchPercentage >= 60.0) {
////                matchedApplicants.add(preference);
////            }
////        }
////
////        return matchedApplicants;
////    }
//
//    //匹配分数的计算
//    private double calculateSkillMatchPercentage(List<String> requiredSkills, List<String> applicantSkills) {
//        long matchingSkillsCount = requiredSkills.stream()
//                .filter(applicantSkills::contains)
//                .count();
//        return (double) matchingSkillsCount / requiredSkills.size() * 100;
//    }
//}

package org.example.applicant_matcher.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.applicant_matcher.dto.ApplicantPreferenceDTO;
import org.example.applicant_matcher.dto.JobDTO;
import org.example.applicant_matcher.dto.MatchDTO;
import org.example.applicant_matcher.kafka.MatchedJobPublisher;
import org.example.applicant_matcher.matchalgo.DesToKeys;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class JobCompanyMatcherService {

    private static final double MATCH_THRESHOLD = 20.0;
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
            // 从 Kafka 消费职位信息
            JobDTO jobPost = objectMapper.readValue(message, JobDTO.class);
            System.out.println("Consumed new job post: " + jobPost.getTitle());

            // 获取申请人偏好
            Map<String, ApplicantPreferenceDTO> preferences = preferencesStreamService.getAllPreferences();

            // 匹配申请人
            List<MatchDTO> matchedApplicants = matchJobToApplicants(jobPost, preferences);

            // 将匹配结果发布到 Kafka
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

            // 第一阶段：技能匹配
            double skillMatchScore = calculateSkillMatchPercentage(
                    jobPost.getSkillsRequired(), preference.getSkills());

            if (skillMatchScore < 60.0) {
                continue; // 如果技能匹配分数低于 60，跳过简历匹配
            }

            // 第二阶段：简历匹配
            Map<String, Integer> jobKeywords = DesToKeys.extractKeywordsWithFrequency(jobPost.getDescription());
            Map<String, Integer> resumeKeywords = DesToKeys.matchKeywordsInPdf(preference.getResume(), jobKeywords);
            double resumeMatchScore = DesToKeys.compareKeywordFrequencies(jobKeywords, resumeKeywords, 10, 0.1);

            // 计算最终匹配分数
            double finalScore = skillMatchScore * 0.6 + resumeMatchScore * 0.4;

            // 过滤低于阈值的匹配
            if (finalScore < MATCH_THRESHOLD) {
                continue;
            }

            // 构造匹配结果
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
}
