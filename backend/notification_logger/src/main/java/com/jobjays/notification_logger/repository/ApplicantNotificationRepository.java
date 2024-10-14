package com.jobjays.notification_logger.repository;

import com.jobjays.notification_logger.model.ApplicantNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicantNotificationRepository extends JpaRepository<ApplicantNotification, Long> {
}
