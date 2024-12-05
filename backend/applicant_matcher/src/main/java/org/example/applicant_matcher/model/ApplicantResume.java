package org.example.applicant_matcher.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

@Entity
public class ApplicantResume {

    @Id
    private Long resumeId;

    private Long userId;

    private String resumeName;

    // Getters and Setters
    @Setter
    @Getter
    @Lob
    private byte[] fileData; // 存储 PDF 文件数据

    // 其他字段和方法
}
