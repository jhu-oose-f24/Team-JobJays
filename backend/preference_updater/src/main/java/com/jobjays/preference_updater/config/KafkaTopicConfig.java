package com.jobjays.preference_updater.config;
import org.springframework.beans.factory.annotation.Value;

import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaAdmin;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaTopicConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String BOOTSTRAP_SERVERS;
    @Bean
    public KafkaAdmin kafkaAdmin() {
        Map<String, Object> configs = new HashMap<>();
        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);
        // add serilizer and deserializer
         //string serde

        return new KafkaAdmin(configs);
    }

    @Bean
    public NewTopic applicantPreferencesMetaTopic() {
        return new NewTopic("applicant_preferences_meta", 1, (short) 1)
                .configs(Map.of("cleanup.policy", "compact"));
    }

    @Bean
    public NewTopic applicantPreferencesTopic() {
        return new NewTopic("applicant_preferences", 3, (short) 1) // Example with 3 partitions
                .configs(Map.of("retention.ms", "604800000")); // Retain messages for one week
    }

    @Bean
    public NewTopic preferenceUpdateRequestsTopic() {
        return new NewTopic("preference_update_requests", 3, (short) 1)
                .configs(Map.of("retention.ms", "604800000")); // Example for preference update requests
    }
}
