package com.jobjays.notification_logger.kafka;

import com.jobjays.notification_logger.dto.NotificationRecordDto;
import com.jobjays.notification_logger.model.EmployerNotification;
import com.jobjays.notification_logger.service.NotificationRecordService;
import org.springframework.stereotype.Component;

@Component
public class EmployerNotificationHandler implements NotificationHandler {

    private final NotificationRecordService recordService;

    public EmployerNotificationHandler(NotificationRecordService recordService) {
        this.recordService = recordService;
    }

    @Override
    public void handleNotification(NotificationRecordDto recordDto) {
        EmployerNotification notification = new EmployerNotification();
        notification.setEmployerJobId(recordDto.getEmployerJobId());
        notification.setApplicantMatchId(recordDto.getApplicantMatchId());
        notification.setScore(recordDto.getScore());
        notification.setJobTitle(recordDto.getJobTitle());
        notification.setApplicantName(recordDto.getApplicantName());
        notification.setEmployerName(recordDto.getEmployerName());
        notification.setGeneratedAt(recordDto.getGeneratedAt());
        recordService.saveEmployerNotification(notification);
    }
}
