package com.jobjays.notification_logger.kafka;

import com.jobjays.notification_logger.dto.NotificationRecordDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationKafkaConsumer {

    private final NotificationHandlerFactory handlerFactory;
    private final ObjectMapper objectMapper;

    public NotificationKafkaConsumer(NotificationHandlerFactory handlerFactory, ObjectMapper objectMapper) {
        this.handlerFactory = handlerFactory;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "notification_record", groupId = "notification-logger-group")
    public void consumeNotificationRecord(String message) {
        try {
            NotificationRecordDto recordDto = objectMapper.readValue(message, NotificationRecordDto.class);
            NotificationHandler handler = handlerFactory.getHandler(recordDto);
            handler.handleNotification(recordDto);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
