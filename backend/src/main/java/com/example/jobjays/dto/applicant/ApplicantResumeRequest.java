package com.example.jobjays.dto.applicant;

import lombok.Data;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

public class ApplicantResumeRequest {
    private Long applicantId;
    private MultipartFile resume;

    public Long getApplicantId() {
        return applicantId;
    }

    public MultipartFile getResume() {
        return resume;
    }

    public void setApplicantId(Long applicantId) {
        this.applicantId = applicantId;
    }

    public void setResume(MultipartFile resume) {
        this.resume = resume;
    }
}
