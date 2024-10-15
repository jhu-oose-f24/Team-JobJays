package org.example.applicant_matcher.service;

import org.springframework.kafka.support.SendResult;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private static final String TOPIC = "my-topic";

    public KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    // 同步发送消息
    public void sendMessageSync(String message) {
        try {
            // 使用 get() 阻塞线程直到发送完成，模拟同步发送
            kafkaTemplate.send(TOPIC, message).get();
            System.out.println("同步消息发送成功: " + message);
        } catch (Exception e) {
            System.out.println("同步消息发送失败: " + message);
            e.printStackTrace();
        }
    }

    // 异步发送消息
    public void sendMessageAsync(String message) {
        // 使用 CompletableFuture 来发送消息并处理回调
        CompletableFuture<SendResult<String, String>> future = kafkaTemplate.send(TOPIC, message);

        // 处理成功或失败的异步回调
        future.whenComplete((result, ex) -> {
            if (ex == null) {
                System.out.println("异步消息发送成功: " + message);
            } else {
                ex.printStackTrace();
                System.out.println("异步消息发送失败: " + message);
            }
        });
    }
}
