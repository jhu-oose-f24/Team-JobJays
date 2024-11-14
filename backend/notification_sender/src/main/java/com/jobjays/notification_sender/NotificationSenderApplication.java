package com.jobjays.notification_sender;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

@SpringBootApplication
public class NotificationSenderApplication implements CommandLineRunner {
    private static final String TOPIC = "send_notification";
    private static final String BOOTSTRAP_SERVERS = "localhost:9092";

    public static void main(String[] args) {
        SpringApplication.run(NotificationSenderApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Properties properties = new Properties();
        properties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);
        properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        properties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

        KafkaProducer<String, String> producer = new KafkaProducer<>(properties);
        ObjectMapper objectMapper = new ObjectMapper();

        // Create the message payload
        Map<String, Object> message = new HashMap<>();
        message.put("to", "muradazimzade@outlook.com");
        message.put("subject", "Test Email - Job Notification");
        message.put("templateName", "job_recommendation");

        // Prepare template data
        Map<String, Object> templateData = new HashMap<>();
        templateData.put("userName", "Murad Azimzade");
        templateData.put("jobs", List.of(
                Map.of("title", "Software Engineer", "company", "TechCorp", "location", "New York, NY", "salary", "$120,000", "link", "https://example.com/apply/123"),
                Map.of("title", "Data Analyst", "company", "DataCorp", "location", "San Francisco, CA", "salary", "$95,000", "link", "https://example.com/apply/456")
        ));
        message.put("templateData", templateData);

        try {
            // Convert the message to JSON format
            String messageJson = objectMapper.writeValueAsString(message);

            // Create a ProducerRecord and send the message
            ProducerRecord<String, String> record = new ProducerRecord<>(TOPIC, messageJson);
            producer.send(record);
            System.out.println("Message sent to topic: " + TOPIC);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            producer.close();
        }
    }
}
