package com.jobjays.notification_logger.service;

import com.jobjays.notification_logger.model.ApplicantNotification;
import com.jobjays.notification_logger.model.EmployerNotification;
import com.jobjays.notification_logger.repository.ApplicantNotificationRepository;
import com.jobjays.notification_logger.repository.EmployerNotificationRepository;
import org.springframework.stereotype.Service;

@Service
public class NotificationRecordService {

    private final ApplicantNotificationRepository applicantRepo;
    private final EmployerNotificationRepository employerRepo;

    public NotificationRecordService(ApplicantNotificationRepository applicantRepo, EmployerNotificationRepository employerRepo) {
        this.applicantRepo = applicantRepo;
        this.employerRepo = employerRepo;
    }

    public void saveApplicantNotification(ApplicantNotification notification) {
        applicantRepo.save(notification);
    }

    public void saveEmployerNotification(EmployerNotification notification) {
        employerRepo.save(notification);
    }
}
