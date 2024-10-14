package com.jobjays.applicant_job_matcher.config;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.kafka.config.StreamsBuilderFactoryBean;
import org.springframework.stereotype.Component;

@Component
public class KafkaStreamsInitializer implements ApplicationListener<ContextRefreshedEvent> {

    private final StreamsBuilderFactoryBean streamsBuilderFactoryBean;

    public KafkaStreamsInitializer(StreamsBuilderFactoryBean streamsBuilderFactoryBean) {
        this.streamsBuilderFactoryBean = streamsBuilderFactoryBean;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        // Start the Kafka Streams instance if not already started
        if (!streamsBuilderFactoryBean.isRunning()) {
            streamsBuilderFactoryBean.start();
        }
    }
}
