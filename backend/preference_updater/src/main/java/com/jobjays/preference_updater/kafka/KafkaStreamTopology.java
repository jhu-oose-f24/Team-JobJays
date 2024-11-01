package com.jobjays.preference_updater.kafka;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.EnableKafkaStreams;
import org.springframework.stereotype.Component;

@Component
@EnableKafkaStreams
public class KafkaStreamTopology {

//    @Bean("processPreferencesStream")
//    public KStream<String, String> processPreferences(@Qualifier(("defaultKafkaStreamsBuilder")) StreamsBuilder streamsBuilder) {
//        KStream<String, String> stream = streamsBuilder.stream("applicant_preferences");
//        stream.foreach((key, value) -> System.out.println("Key: " + key + ", Value: " + value));
//        return stream;
//    }
@Bean("processPreferencesStream")
public KStream<String, String> processPreferences(@Qualifier("defaultKafkaStreamsBuilder") StreamsBuilder streamsBuilder) {
    // Create initial KStream with specified serdes
    KStream<String, String> stream = streamsBuilder.stream(
            "applicant_preferences",
            Consumed.with(Serdes.String(), Serdes.String())
    );

    // Example aggregation step with explicit serdes
    KGroupedStream<String, String> groupedStream = stream
            .groupByKey(Grouped.with(Serdes.String(), Serdes.String()));

    KTable<String, Long> aggregatedTable = groupedStream
            .count(Materialized.with(Serdes.String(), Serdes.Long()));

    aggregatedTable.toStream().foreach((key, value) -> System.out.println("Key: " + key + ", Count: " + value));

    return stream;
}


}
