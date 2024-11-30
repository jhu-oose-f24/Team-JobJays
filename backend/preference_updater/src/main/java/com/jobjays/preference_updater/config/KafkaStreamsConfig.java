package com.jobjays.preference_updater.config;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.common.utils.Bytes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.kstream.Materialized;
import org.apache.kafka.streams.state.KeyValueStore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaStreamsConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String BOOTSTRAP_SERVERS;

    @Bean
    public Map<String, Object> streamsConfig() {
        Map<String, Object> props = new HashMap<>();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "preference-updater-app");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.StringSerde.class.getName()); // Set key serde
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.StringSerde.class.getName()); // Set value serde
        return props;
    }

    @Bean
    public StreamsBuilder preferenceStreamsBuilder() {
        StreamsBuilder builder = new StreamsBuilder();

        // Create the state store for applicant preferences
        builder.globalTable(
                "applicant_preferences",
                Materialized.<String, String, KeyValueStore<Bytes, byte[]>>as("applicant-preferences-store")
                        .withKeySerde(Serdes.String())
                        .withValueSerde(Serdes.String())
        );

        return builder;
    }
}
