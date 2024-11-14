package org.example.applicant_matcher.dto;
import lombok.Getter;
import lombok.Setter;
import org.example.applicant_matcher.dto.ApplicantPreferenceDTO;
import java.util.List;
@Getter
@Setter
public class CompanyNotificationDTO {
    private String jobId;
    private String jobTitle;
    private String employerEmail;
    private List<ApplicantPreferenceDTO> matchedApplicants;

    public CompanyNotificationDTO(String jobId, String jobTitle, String employerEmail, List<ApplicantPreferenceDTO> matchedApplicants) {
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.employerEmail = employerEmail;
        this.matchedApplicants = matchedApplicants;
    }

}
