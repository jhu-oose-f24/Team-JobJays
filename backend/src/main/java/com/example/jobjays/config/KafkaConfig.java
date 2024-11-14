package com.example.jobjays.config;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.*;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableKafka
public class KafkaConfig {
    private static final String BOOTSTRAP_SERVERS = "74.179.58.106:29092";
    private static final String USERNAME = "youruser";
    private static final String PASSWORD = "yourpassword";
    private static final String GROUP_ID = "job-matcher-group";

    // Common Producer Configuration
    public Map<String, Object> producerConfigs() {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);

        // SASL/PLAIN Authentication
        props.put("security.protocol", "SASL_PLAINTEXT");
        props.put("sasl.mechanism", "PLAIN");
        props.put("sasl.jaas.config",
                "org.apache.kafka.common.security.plain.PlainLoginModule required username=\""
                        + USERNAME + "\" password=\"" + PASSWORD + "\";");
        return props;
    }

    // Producer Factory for String-String
    @Bean
    public ProducerFactory<String, String> producerFactoryString() {
        Map<String, Object> props = new HashMap<>(producerConfigs());
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        return new DefaultKafkaProducerFactory<>(props);
    }

    // KafkaTemplate Bean for String-String
    @Bean(name = "kafkaTemplateString")
    public KafkaTemplate<String, String> kafkaTemplateString() {
        return new KafkaTemplate<>(producerFactoryString());
    }

    // Producer Factory for String-Object (if needed)
    @Bean
    public ProducerFactory<String, Object> producerFactoryObject() {
        Map<String, Object> props = new HashMap<>(producerConfigs());
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        return new DefaultKafkaProducerFactory<>(props);
    }

    // KafkaTemplate Bean for String-Object (if needed)
    @Bean(name = "kafkaTemplateObject")
    public KafkaTemplate<String, Object> kafkaTemplateObject() {
        return new KafkaTemplate<>(producerFactoryObject());
    }

    // Consumer Configuration
    public Map<String, Object> consumerConfigs() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, GROUP_ID);

        // SASL/PLAIN Authentication
        props.put("security.protocol", "SASL_PLAINTEXT");
        props.put("sasl.mechanism", "PLAIN");

        return props;
    }

    // Consumer Factory for String-String
    @Bean
    public ConsumerFactory<String, String> consumerFactoryString() {
        Map<String, Object> props = new HashMap<>(consumerConfigs());
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        return new DefaultKafkaConsumerFactory<>(props);
    }

    // Kafka Listener Container Factory for String-String
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactoryString() {
        ConcurrentKafkaListenerContainerFactory<String, String> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactoryString());
        return factory;
    }
}
