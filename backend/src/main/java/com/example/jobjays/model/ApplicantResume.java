package com.example.jobjays.model;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@Table(name = "applicant_resume")
public class ApplicantResume {
    @Id
    @GeneratedValue
    private Long resume_id;
    private String resumeName;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] fileData;
    private String userName;
    private Long userId;
    private LocalDateTime uploadedAt;

    public ApplicantResume(Long resumeId, String resumeName, String userName, Long userId, LocalDateTime uploadedAt) {
        this.resume_id = resumeId;
        this.resumeName = resumeName;
        this.userName = userName;
        this.userId = userId;
        this.uploadedAt = uploadedAt;
    }

    public ApplicantResume() {

    }
}
