package com.jobjays.notification_logger.kafka;

import com.jobjays.notification_logger.dto.NotificationRecordDto;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class NotificationHandlerFactory {

    private final Map<String, NotificationHandler> handlerMap;

    public NotificationHandlerFactory(Map<String, NotificationHandler> handlerMap) {
        this.handlerMap = handlerMap;
    }

    public NotificationHandler getHandler(NotificationRecordDto recordDto) {
        if ("APPLICANT".equalsIgnoreCase(recordDto.getType())) {
            return handlerMap.get("applicantNotificationHandler");
        } else if ("EMPLOYER".equalsIgnoreCase(recordDto.getType())) {
            return handlerMap.get("employerNotificationHandler");
        } else {
            throw new IllegalArgumentException("Unknown notification type: " + recordDto.getType());
        }
    }
}
