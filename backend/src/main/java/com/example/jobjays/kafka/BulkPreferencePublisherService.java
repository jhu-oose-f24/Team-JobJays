package com.example.jobjays.kafka;
import com.example.jobjays.repository.ApplicantPreferenceRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BulkPreferencePublisherService {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ApplicantPreferenceRepository preferenceRepository;
    private final ObjectMapper objectMapper;
    private final PreferenceMetaService metaService;

    private static final String PREFERENCES_TOPIC = "applicant_preferences";
    private static final int BATCH_SIZE = 100;

    public BulkPreferencePublisherService(KafkaTemplate<String, String> kafkaTemplate,
                                          ApplicantPreferenceRepository preferenceRepository,
                                          ObjectMapper objectMapper,
                                          PreferenceMetaService metaService) {
        this.kafkaTemplate = kafkaTemplate;
        this.preferenceRepository = preferenceRepository;
        this.objectMapper = objectMapper;
        this.metaService = metaService;
    }

    @PostConstruct
    public void publishAllPreferences() {
        if (!metaService.isBulkLoaded()) {
            List<PreferencePublisherService.ApplicantPreferenceDTO> preferences = preferenceRepository.findAll().stream()
                    .map(PreferencePublisherService.ApplicantPreferenceDTO::new)
                    .collect(Collectors.toList());

            List<List<PreferencePublisherService.ApplicantPreferenceDTO>> batches = partitionList(preferences, BATCH_SIZE);

            for (List<PreferencePublisherService.ApplicantPreferenceDTO> batch : batches) {
                try {
                    for (PreferencePublisherService.ApplicantPreferenceDTO preference : batch) {
                        try {
                            String key = preference.getApplicantId().toString();  // Generate key from applicantId
                            String value = objectMapper.writeValueAsString(preference);

                            System.out.println("Publishing preference for applicant: " + key);
                            kafkaTemplate.send(PREFERENCES_TOPIC, key, value);  // Include both key and value
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    System.out.println("Published batch of preferences with size: " + batch.size());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            // Mark the bulk load as complete
            metaService.setBulkLoaded();
        } else {
            System.out.println("Bulk load already completed. Skipping...");
        }
    }

    private List<List<PreferencePublisherService.ApplicantPreferenceDTO>> partitionList(List<PreferencePublisherService.ApplicantPreferenceDTO> list, int size) {
        return new ArrayList<>(list.stream()
                .collect(Collectors.groupingBy(s -> (list.indexOf(s) / size)))
                .values());
    }
}
