package  com.example.jobjays.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


public class KafkaTopicConfig {

    @Bean
    public NewTopic applicantPreferencesMetaTopic() {
        return new NewTopic("applicant_preferences_meta", 3, (short) 1);
    }

    @Bean
    public NewTopic preferenceUpdateRequests() {
        return new NewTopic("preference_update_requests", 2, (short) 1);
    }
    @Bean
    public NewTopic applicantPreferences() {
        return new NewTopic("applicant_preferences", 2, (short) 1);
    }


    // Add more topics as needed
}
