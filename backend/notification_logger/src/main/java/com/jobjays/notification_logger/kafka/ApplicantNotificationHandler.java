package com.jobjays.notification_logger.kafka;

import com.jobjays.notification_logger.dto.NotificationRecordDto;
import com.jobjays.notification_logger.model.ApplicantNotification;
import com.jobjays.notification_logger.service.NotificationRecordService;
import org.springframework.stereotype.Component;

@Component
public class ApplicantNotificationHandler implements NotificationHandler {

    private final NotificationRecordService recordService;

    public ApplicantNotificationHandler(NotificationRecordService recordService) {
        this.recordService = recordService;
    }

    @Override
    public void handleNotification(NotificationRecordDto recordDto) {
        ApplicantNotification notification = new ApplicantNotification();
        notification.setJobId(recordDto.getJobId());
        notification.setApplicantId(recordDto.getApplicantId());
        notification.setScore(recordDto.getScore());
        notification.setJobTitle(recordDto.getJobTitle());
        notification.setApplicantName(recordDto.getApplicantName());
        notification.setGeneratedAt(recordDto.getGeneratedAt());
        recordService.saveApplicantNotification(notification);
    }
}
