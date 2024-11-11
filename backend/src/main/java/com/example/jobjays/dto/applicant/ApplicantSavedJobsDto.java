package com.example.jobjays.dto.applicant;


import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.JobPost;

public class ApplicantSavedJobsDto {

    private Long applicantId;
    private JobPost jobPost;

    public JobPost getJobPost() {
        return jobPost;
    }

    public void setJobPost(JobPost jobPost) {
        this.jobPost = jobPost;
    }

    public Long getApplicantId() {
        return applicantId;
    }

    public void setApplicantId(Long applicantId) {
        this.applicantId = applicantId;
    }




//    private Applicant applicant;

}
