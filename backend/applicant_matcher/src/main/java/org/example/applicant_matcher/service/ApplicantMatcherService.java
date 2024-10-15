package org.example.applicant_matcher.service;

import org.example.applicant_matcher.dto.JobPosting;
import org.example.applicant_matcher.dto.Resume;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicantMatcherService {

    @Autowired
    private ResumeRepository resumeRepository;
    @Autowired
    private NotificationService notificationService;

    public void matchApplicantsForJob(JobPosting jobPosting) {
        String jobDescription = jobPosting.getJobDescription();
        List<String> jobRequirements = jobPosting.getJobRequirements();

        List<Resume> allResumes = resumeRepository.findAll();
        List<Resume> matchingResumes = allResumes.stream()
                .filter(resume -> matchesJob(resume, jobDescription, jobRequirements))
                .collect(Collectors.toList());

        if (!matchingResumes.isEmpty()) {
            notificationService.notifyCompany(jobPosting.getCompanyId(), matchingResumes);
        }
    }

    private boolean matchesJob(Resume resume, String jobDescription, List<String> jobRequirements) {
        return jobRequirements.stream().anyMatch(requirement -> resume.getSkills().contains(requirement));
    }
}
