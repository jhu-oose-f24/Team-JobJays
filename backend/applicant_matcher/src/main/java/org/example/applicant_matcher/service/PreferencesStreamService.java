package org.example.applicant_matcher.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.applicant_matcher.dto.ApplicantPreferenceDTO;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StoreQueryParameters;
import org.apache.kafka.streams.state.QueryableStoreTypes;
import org.apache.kafka.streams.state.ReadOnlyKeyValueStore;
import org.springframework.beans.factory.SmartInitializingSingleton;
import org.springframework.kafka.config.StreamsBuilderFactoryBean;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PreferencesStreamService implements SmartInitializingSingleton {

    private KafkaStreams kafkaStreams;
    private final StreamsBuilderFactoryBean streamsBuilderFactoryBean;
    private final ObjectMapper objectMapper;
    private static final String PREFERENCES_STORE = "applicant-preferences-store";

    public PreferencesStreamService(StreamsBuilderFactoryBean streamsBuilderFactoryBean, ObjectMapper objectMapper) {
        this.streamsBuilderFactoryBean = streamsBuilderFactoryBean;
        this.objectMapper = objectMapper;
    }

    @Override
    public void afterSingletonsInstantiated() {
        this.kafkaStreams = streamsBuilderFactoryBean.getKafkaStreams();
    }

    public Map<String, ApplicantPreferenceDTO> getAllPreferences() {
        Map<String, ApplicantPreferenceDTO> preferencesMap = new HashMap<>();
        kafkaStreams = streamsBuilderFactoryBean.getKafkaStreams();

        try {
            if (kafkaStreams == null) {
                throw new IllegalStateException("KafkaStreams is not initialized");
            }

            ReadOnlyKeyValueStore<String, String> store = kafkaStreams.store(
                    StoreQueryParameters.fromNameAndType(PREFERENCES_STORE, QueryableStoreTypes.keyValueStore())
            );

            store.all().forEachRemaining(entry -> {
                try {
                    String key = entry.key;
                    String value = entry.value;
                    ApplicantPreferenceDTO preference = objectMapper.readValue(value, ApplicantPreferenceDTO.class);
                    preferencesMap.put(key, preference);
                } catch (Exception e) {
                    System.err.println("Error deserializing preference for key: " + entry.key);
                    e.printStackTrace();
                }
            });
        } catch (Exception e) {
            System.err.println("Error accessing the preferences store: " + e.getMessage());
            e.printStackTrace();
        }

        return preferencesMap;
    }
}
