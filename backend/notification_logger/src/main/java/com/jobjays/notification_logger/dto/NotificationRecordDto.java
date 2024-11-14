package com.jobjays.notification_logger.dto;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationRecordDto {
    private String type; // "APPLICANT" or "EMPLOYER"
    private Long jobId;
    private Long applicantId;
    private Long employerJobId;
    private Long applicantMatchId;
    private Double score;
    private String jobTitle;
    private String applicantName;
    private String employerName;
    private LocalDateTime generatedAt;
}
