package dev.eappiah.jobjays.create_job_api;

import dev.eappiah.jobjays.create_job_api.post.Employer;
import dev.eappiah.jobjays.create_job_api.post.JobPost;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class CreateJobApiApplication {

	public static void main(String[] args) {


		SpringApplication.run(CreateJobApiApplication.class, args);
	}



}
