package com.example.jobjays.model;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@Builder
@Table(name = "applicant_resume")
public class ApplicantResume {
    @Id
    @GeneratedValue
    private Long resume_id;
    private String resumeName;
    @Lob
    private byte[] fileData;
    private String userName;
    private Long userId;
    private LocalDateTime uploadedAt;
}
