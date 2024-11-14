package org.example.applicant_matcher.config;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.KTable;
import org.apache.kafka.streams.kstream.Materialized;
import org.springframework.beans.factory.SmartInitializingSingleton;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafkaStreams;

@Configuration
@EnableKafkaStreams
public class KafkaStreamsConfig implements SmartInitializingSingleton {

    private final StreamsBuilder streamsBuilder;

    public KafkaStreamsConfig(StreamsBuilder streamsBuilder) {
        this.streamsBuilder = streamsBuilder;
    }

    @Override
    public void afterSingletonsInstantiated() {
        buildTopology();
    }

    private void buildTopology() {
        String PREFERENCES_TOPIC = "applicant_preferences";
        String PREFERENCES_STORE = "applicant-preferences-store";

        KTable<String, String> applicantPreferencesTable = streamsBuilder.table(
                PREFERENCES_TOPIC,
                Consumed.with(Serdes.String(), Serdes.String()),
                Materialized.<String, String, org.apache.kafka.streams.state.KeyValueStore<org.apache.kafka.common.utils.Bytes, byte[]>>as(PREFERENCES_STORE)
                        .withKeySerde(Serdes.String())
                        .withValueSerde(Serdes.String())
        );

        // Additional topology configurations can be added here if needed
    }
}