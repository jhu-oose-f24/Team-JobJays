package com.example.jobjays.kafka;

import lombok.Getter;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class PreferenceMetaService {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private static final String META_TOPIC = "applicant_preferences_meta";
    // Check if the bulk load is done by reading from the meta topic
    @Getter
    private volatile boolean bulkLoaded;

    public PreferenceMetaService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @KafkaListener(topics = META_TOPIC, groupId = "meta-group")
    public void listen(ConsumerRecord<String, String> record) {
        if ("bulk_load_status".equals(record.key()) && "loaded".equals(record.value())) {
            bulkLoaded = true;
        }
    }

    // Set the status to "loaded" after completing the bulk load
    public void setBulkLoaded() {
        kafkaTemplate.send(META_TOPIC, "bulk_load_status", "loaded");
    }
}