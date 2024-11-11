package org.example.applicant_matcher.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class JobDTO {
    private Long jobId;
    private String description;
    private String title;
    private List<String> skillsRequired;
    private String employerName;
    private String employerEmail;




}
