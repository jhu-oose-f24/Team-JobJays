package com.example.jobjays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JobJaysApiApplication {

    public static void main(String[] args) {

      SpringApplication.run(JobJaysApiApplication.class, args);
      // read current kafka bootstrap servername
        String kafkaBootstrapServer = System.getenv("KAFKA_BOOTSTRAP_SERVER");
        System.out.println("Kafka bootstrap server: " + kafkaBootstrapServer);
    }
}
