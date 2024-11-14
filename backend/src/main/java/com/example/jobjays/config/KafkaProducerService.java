package com.example.jobjays.config;
import org.springframework.kafka.support.SendResult;
import java.util.concurrent.CompletableFuture;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

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
            kafkaTemplate.send(TOPIC, message).get(); // 发送同步消息
            System.out.println("同步消息发送成功: " + message);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("同步消息发送失败: " + message);
        }
    }

    // 异步发送消息
    public void sendMessageAsync(String message) {
        CompletableFuture<SendResult<String, String>> future = kafkaTemplate.send(TOPIC, message);

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
