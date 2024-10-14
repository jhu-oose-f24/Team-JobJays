package com.jobjays.preference_updater.kafka;

import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.KStream;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.EnableKafkaStreams;
import org.springframework.stereotype.Component;

@Component
@EnableKafkaStreams
public class KafkaStreamTopology {

    @Bean("processPreferencesStream")
    public KStream<String, String> processPreferences(@Qualifier(("defaultKafkaStreamsBuilder")) StreamsBuilder streamsBuilder) {
        KStream<String, String> stream = streamsBuilder.stream("applicant_preferences");
        stream.foreach((key, value) -> System.out.println("Key: " + key + ", Value: " + value));
        return stream;
    }

}
