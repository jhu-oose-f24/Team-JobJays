package com.jobjays.notification_logger.repository;

import com.jobjays.notification_logger.model.EmployerNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerNotificationRepository extends JpaRepository<EmployerNotification, Long> {
}
