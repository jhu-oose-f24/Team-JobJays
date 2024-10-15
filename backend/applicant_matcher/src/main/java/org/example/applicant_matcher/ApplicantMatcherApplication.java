package org.example.applicant_matcher;

import org.example.applicant_matcher.service.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;




@SpringBootApplication
public class ApplicantMatcherApplication implements CommandLineRunner{
    @Autowired
    private KafkaProducerService kafkaProducerService;

    public static void main(String[] args) {
        SpringApplication.run(ApplicantMatcherApplication.class, args);
    }

    // CommandLineRunner 的 run 方法
    @Override
    public void run(String... args) throws Exception {
        kafkaProducerService.sendMessageSync("Hello, Kafka (Sync)!");
        kafkaProducerService.sendMessageAsync("Hello, Kafka (Async)!");
        Thread.sleep(5000);
    }
//    public static void main(String[] args) {
//        SpringApplication.run(ApplicantMatcherApplication.class, args);
//    }

}
