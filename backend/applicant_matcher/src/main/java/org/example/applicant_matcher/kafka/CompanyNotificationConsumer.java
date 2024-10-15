package org.example.applicant_matcher.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class CompanyNotificationConsumer {

    @KafkaListener(topics = "company-notifications", groupId = "company-group")
    public void listen(String message) {
        // 处理收到的通知
        System.out.println("Received notification: " + message);
    }
}
