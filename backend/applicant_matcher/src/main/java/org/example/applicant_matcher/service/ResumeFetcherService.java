package org.example.applicant_matcher.service;
import org.example.applicant_matcher.model.ApplicantResume;
//import org.example.applicant_matcher.repository.ApplicantResumeRepository;
import org.springframework.stereotype.Service;
import com.example.jobjays.repository.ApplicantResumeRepository;

import java.util.Optional;

@Service
public class ResumeFetcherService {

    private final ApplicantResumeRepository applicantResumeRepository;

    public ResumeFetcherService(ApplicantResumeRepository applicantResumeRepository) {
        this.applicantResumeRepository = applicantResumeRepository;
    }

    /**
     * Fetch the resume binary data for a given applicant ID.
     *
     * @param applicantId the ID of the applicant
     * @return the binary data of the first resume, if available
     */
    public Optional<byte[]> getResumeByUserId(Long userId) {
        List<ApplicantResume> resumes = applicantResumeRepository.findByUserIdWithResumeData(userId);
        if (resumes.isEmpty()) {
            return Optional.empty();
        }
        return Optional.ofNullable(resumes.get(0).getFileData());
    }
}
