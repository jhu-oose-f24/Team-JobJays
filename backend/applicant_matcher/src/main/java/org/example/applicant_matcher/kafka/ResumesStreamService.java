package org.example.applicant_matcher.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.applicant_matcher.dto.AppDTO;
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
public class ResumesStreamService implements SmartInitializingSingleton {

    private KafkaStreams kafkaStreams;
    private final StreamsBuilderFactoryBean streamsBuilderFactoryBean;
    private final ObjectMapper objectMapper;
    private static final String PREFERENCES_STORE = "applicant-preferences-store";

    public ResumesStreamService(StreamsBuilderFactoryBean streamsBuilderFactoryBean, ObjectMapper objectMapper) {
        this.streamsBuilderFactoryBean = streamsBuilderFactoryBean;
        this.objectMapper = objectMapper;
    }

    @Override
    public void afterSingletonsInstantiated() {
        this.kafkaStreams = streamsBuilderFactoryBean.getKafkaStreams();
    }

    public Map<String, AppDTO> getAllPreferences() {
        Map<String, AppDTO> preferencesMap = new HashMap<>();
        kafkaStreams = streamsBuilderFactoryBean.getKafkaStreams();

        try {
            if (kafkaStreams == null) {
                throw new IllegalStateException("KafkaStreams is not initialized");
            }

            int maxRetries = 10;
            int retryCount = 0;
            long waitMillis = 1000;

            // Loop to check if the store is available
            while (retryCount < maxRetries) {
                try {
                    // Try to retrieve the store
                    ReadOnlyKeyValueStore<String, String> store = kafkaStreams.store(
                            StoreQueryParameters.fromNameAndType(PREFERENCES_STORE, QueryableStoreTypes.keyValueStore())
                    );

                    // If store retrieval is successful, exit the loop
                    if (store != null) {
                        store.all().forEachRemaining(entry -> {
                            try {
                                String key = entry.key;
                                String value = entry.value;
                                AppDTO preference = objectMapper.readValue(value, AppDTO.class);
                                preferencesMap.put(key, preference);
                            } catch (Exception e) {
                                System.err.println("Error deserializing preference for key: " + entry.key);
                                e.printStackTrace();
                            }
                        });
                        return preferencesMap;  // Return once all data is retrieved
                    }
                } catch (Exception e) {
                    // If store is not available, wait and retry
                    System.err.println("Waiting for state store availability. Attempt: " + (retryCount + 1));
                    Thread.sleep(waitMillis);
                    retryCount++;
                }
            }

            throw new IllegalStateException("State store " + PREFERENCES_STORE + " was not accessible after retries.");

        } catch (Exception e) {
            System.err.println("Error accessing the preferences store: " + e.getMessage());
            e.printStackTrace();
        }

        return preferencesMap;
    }
}