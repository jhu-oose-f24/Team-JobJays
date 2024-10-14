package com.jobjays.notification_logger.kafka;

import com.jobjays.notification_logger.dto.NotificationRecordDto;

public interface NotificationHandler {
    void handleNotification(NotificationRecordDto recordDto);
}
