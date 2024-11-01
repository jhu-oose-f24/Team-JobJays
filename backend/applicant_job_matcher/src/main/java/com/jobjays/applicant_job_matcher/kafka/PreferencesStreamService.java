package com.jobjays.applicant_job_matcher.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobjays.applicant_job_matcher.dto.ApplicantPreferenceDTO;
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

//    public Map<String, ApplicantPreferenceDTO> getAllPreferences() {
//        Map<String, ApplicantPreferenceDTO> preferencesMap = new HashMap<>();
//        kafkaStreams = streamsBuilderFactoryBean.getKafkaStreams();
//        try {
//            if (kafkaStreams == null) {
//                throw new IllegalStateException("KafkaStreams is not initialized");
//            }
//
//            int retryCount = 0;
//            int maxRetries = 5;
//            long backoffMillis = 1000;
//
//            // Retry loop with exponential backoff
//            while ((kafkaStreams.state() == KafkaStreams.State.ERROR || kafkaStreams.state() == KafkaStreams.State.REBALANCING )&& retryCount < maxRetries) {
//                System.err.println("KafkaStreams is in ERROR state. Attempting to reset...");
//
//                kafkaStreams.cleanUp();
////                kafkaStreams.start();
//
//                // Exponential backoff delay
//                Thread.sleep(backoffMillis * (long) Math.pow(2, retryCount));
//                retryCount++;
//
//                // Log the current state after each retry
//                System.err.println("Retry " + retryCount + " - KafkaStreams current state: " + kafkaStreams.state());
//            }
//
//            // Check if the streams are in a running or rebalancing state
//            KafkaStreams.State state = kafkaStreams.state();
//            if (state == KafkaStreams.State.RUNNING || state == KafkaStreams.State.REBALANCING) {
//                ReadOnlyKeyValueStore<String, String> store = kafkaStreams.store(
//                        StoreQueryParameters.fromNameAndType(PREFERENCES_STORE, QueryableStoreTypes.keyValueStore())
//                );
//
//                store.all().forEachRemaining(entry -> {
//                    try {
//                        String key = entry.key;
//                        String value = entry.value;
//                        ApplicantPreferenceDTO preference = objectMapper.readValue(value, ApplicantPreferenceDTO.class);
//                        preferencesMap.put(key, preference);
//                    } catch (Exception e) {
//                        System.err.println("Error deserializing preference for key: " + entry.key);
//                        e.printStackTrace();
//                    }
//                });
//            } else {
//                throw new IllegalStateException("KafkaStreams is not running. Current state: " + state);
//            }
//        } catch (Exception e) {
//            System.err.println("Error accessing the preferences store: " + e.getMessage());
//            e.printStackTrace();
//        }
//
//        return preferencesMap;
//    }
public Map<String, ApplicantPreferenceDTO> getAllPreferences() {
    Map<String, ApplicantPreferenceDTO> preferencesMap = new HashMap<>();
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
                            ApplicantPreferenceDTO preference = objectMapper.readValue(value, ApplicantPreferenceDTO.class);
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
