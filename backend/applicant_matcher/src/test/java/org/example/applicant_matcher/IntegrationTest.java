////package org.example.applicant_matcher;
////
////import org.example.applicant_matcher.dto.ApplicantPreferenceDTO;
////import org.example.applicant_matcher.dto.JobDTO;
////import org.example.applicant_matcher.dto.MatchDTO;
////import org.example.applicant_matcher.kafka.MatchedJobPublisher;
////import org.example.applicant_matcher.service.JobCompanyMatcherService;
////import org.junit.jupiter.api.Test;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.boot.test.context.SpringBootTest;
////
////import java.util.List;
////import java.util.Map;
////
////@SpringBootTest
////public class IntegrationTest {
////
////    @Autowired
////    private JobCompanyMatcherService jobCompanyMatcherService;
////
////    @Autowired
////    private MatchedJobPublisher matchedJobPublisher;
////
////    @Test
////    public void testEntireProjectFlow() {
////        // 1. 模拟职位信息
////        JobDTO jobPost = new JobDTO(
////                123L,
////                "Software Engineer",
////                "Looking for a skilled Java developer",
////                8000.0,
////                List.of("Java", "Spring", "Kafka"),
////                "IT",
////                "remote",
////                "TechCorp",
////                null,
////                List.of("Backend", "Developer"),
////                "9-to-5",
////                "hr@techcorp.com"
////        );
////
////        // 2. 模拟候选人偏好
////        ApplicantPreferenceDTO applicant1 = new ApplicantPreferenceDTO(
////                1L, // applicantId
////                "applicant1@example.com", // email
////                "John Doe", // name
////                List.of("IT"), // industries
////                List.of("Software Engineer"), // jobTitles
////                List.of("Java", "Spring"), // skills
////                7000.0, // minMonthlySalary
////                List.of("remote"), // jobTypes
////                List.of("9-to-5") // workTimings
////        );
////
////        ApplicantPreferenceDTO applicant2 = new ApplicantPreferenceDTO(
////                2L, // applicantId
////                "applicant2@example.com", // email
////                "Jane Smith", // name
////                List.of("IT"), // industries
////                List.of("Frontend Engineer"), // jobTitles
////                List.of("JavaScript", "React"), // skills
////                6000.0, // minMonthlySalary
////                List.of("remote"), // jobTypes
////                List.of("9-to-5") // workTimings
////        );
////
////
////        Map<String, ApplicantPreferenceDTO> preferences = Map.of(
////                String.valueOf(applicant1.getApplicantId()), applicant1, // 将 Long 转换为 String
////                String.valueOf(applicant2.getApplicantId()), applicant2
////        );
////
////
////        // 3. 测试匹配逻辑
////        List<MatchDTO> matchedApplicants = jobCompanyMatcherService.matchJobToApplicants(jobPost, preferences);
////        System.out.println("Matched Applicants: " + matchedApplicants);
////
////        // 4. 测试 Kafka 消息生产
////        matchedJobPublisher.publishMatchedApplicantToCompany(jobPost, matchedApplicants);
////
////    }
////}
//
//package org.example.applicant_matcher;
//
//import org.apache.kafka.clients.consumer.ConsumerRecord;
//import org.example.applicant_matcher.dto.ApplicantPreferenceDTO;
//import org.example.applicant_matcher.dto.JobDTO;
//import org.example.applicant_matcher.dto.MatchDTO;
//import org.example.applicant_matcher.dto.CompanyNotificationDTO;
//import org.example.applicant_matcher.kafka.MatchedJobPublisher;
//import org.example.applicant_matcher.service.JobCompanyMatcherService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.kafka.test.context.EmbeddedKafka;
//import org.springframework.kafka.test.utils.KafkaTestUtils;
//
//import java.util.List;
//import java.util.Map;
//import java.util.concurrent.BlockingQueue;
//import java.util.concurrent.LinkedBlockingQueue;
//import java.util.concurrent.TimeUnit;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@SpringBootTest
//@EmbeddedKafka(partitions = 1, topics = { "matched_applicants_for_company" })
//public class IntegrationTest {
//
//    @Autowired
//    private JobCompanyMatcherService jobCompanyMatcherService;
//
//    @Autowired
//    private MatchedJobPublisher matchedJobPublisher;
//
//    @Autowired
//    private KafkaTemplate<String, String> kafkaTemplate;
//
//    private BlockingQueue<ConsumerRecord<String, String>> records = new LinkedBlockingQueue<>();
//
//    // Kafka Listener for consuming messages in the test
//    @KafkaListener(topics = "matched_applicants_for_company")
//    public void consume(ConsumerRecord<String, String> record) {
//        records.add(record);
//    }
//
//    @Test
//    public void testEntireProjectFlow() throws Exception {
//        // 1. 模拟职位信息
//        JobDTO jobPost = new JobDTO(
//                123L,
//                "Software Engineer",
//                "Looking for a skilled Java developer",
//                8000.0,
//                List.of("Java", "Spring", "Kafka"),
//                "IT",
//                "remote",
//                "TechCorp",
//                null,
//                List.of("Backend", "Developer"),
//                "9-to-5",
//                "hr@techcorp.com"
//        );
//
//        // 2. 模拟候选人偏好
//        ApplicantPreferenceDTO applicant1 = new ApplicantPreferenceDTO(
//                1L,
//                "applicant1@example.com",
//                "John Doe",
//                List.of("IT"),
//                List.of("Software Engineer"),
//                List.of("Java", "Spring"),
//                7000.0,
//                List.of("remote"),
//                List.of("9-to-5")
//        );
//
//        ApplicantPreferenceDTO applicant2 = new ApplicantPreferenceDTO(
//                2L,
//                "applicant2@example.com",
//                "Jane Smith",
//                List.of("IT"),
//                List.of("Frontend Engineer"),
//                List.of("JavaScript", "React"),
//                6000.0,
//                List.of("remote"),
//                List.of("9-to-5")
//        );
//
//        Map<String, ApplicantPreferenceDTO> preferences = Map.of(
//                String.valueOf(applicant1.getApplicantId()), applicant1,
//                String.valueOf(applicant2.getApplicantId()), applicant2
//        );
//
//        // 3. 测试匹配逻辑
//        List<MatchDTO> matchedApplicants = jobCompanyMatcherService.matchJobToApplicants(jobPost, preferences);
//        System.out.println("Matched Applicants: " + matchedApplicants);
//
//        // 4. 测试 Kafka 消息生产
//        matchedJobPublisher.publishMatchedApplicantToCompany(jobPost, matchedApplicants);
//
//        // 5. 验证 Kafka 消息是否被成功接收
//        ConsumerRecord<String, String> received = records.poll(10, TimeUnit.SECONDS);
//        assertThat(received).isNotNull();  // 验证消息被接收
//        assertThat(received.value()).contains("Software Engineer");  // 检查消息内容
//        assertThat(received.value()).contains("hr@techcorp.com");
//
//        System.out.println("Kafka message received: " + received.value());
//    }
//}
//
package org.example.applicant_matcher;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.example.applicant_matcher.dto.ApplicantPreferenceDTO;
import org.example.applicant_matcher.dto.JobDTO;
import org.example.applicant_matcher.dto.MatchDTO;
import org.example.applicant_matcher.dto.CompanyNotificationDTO;
import org.example.applicant_matcher.kafka.MatchedJobPublisher;
import org.example.applicant_matcher.service.CompanyNotificationService;
import org.example.applicant_matcher.service.JobCompanyMatcherService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.kafka.test.utils.KafkaTestUtils;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.List;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@EmbeddedKafka(partitions = 1, topics = { "matched_applicants_for_company" })
public class IntegrationTest {

    @Autowired
    private JobCompanyMatcherService jobCompanyMatcherService;

    @Autowired
    private MatchedJobPublisher matchedJobPublisher;

    @Autowired
    private CompanyNotificationService companyNotificationService;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private JavaMailSender mailSender;

    private BlockingQueue<ConsumerRecord<String, String>> records = new LinkedBlockingQueue<>();

    // Kafka Listener for consuming messages in the test
    @KafkaListener(topics = "matched_applicants_for_company")
    public void consume(ConsumerRecord<String, String> record) {
        records.add(record);
    }

    @Test
    public void testEntireProjectFlowWithEmail() throws Exception {
        // 1. 模拟职位信息
        JobDTO jobPost = new JobDTO(
                123L,
                "Software Engineer",
                "Looking for a skilled Java developer",
                8000.0,
                List.of("Java", "Spring", "Kafka"),
                "IT",
                "remote",
                "TechCorp",
                null,
                List.of("Backend", "Developer"),
                "9-to-5",
                "hr@techcorp.com"
        );

        // 2. 模拟候选人偏好
        ApplicantPreferenceDTO applicant1 = new ApplicantPreferenceDTO(
                1L,
                "applicant1@example.com",
                "John Doe",
                List.of("IT"),
                List.of("Software Engineer"),
                List.of("Java", "Spring"),
                7000.0,
                List.of("remote"),
                List.of("9-to-5")
        );

        ApplicantPreferenceDTO applicant2 = new ApplicantPreferenceDTO(
                2L,
                "applicant2@example.com",
                "Jane Smith",
                List.of("IT"),
                List.of("Frontend Engineer"),
                List.of("JavaScript", "React"),
                6000.0,
                List.of("remote"),
                List.of("9-to-5")
        );

        Map<String, ApplicantPreferenceDTO> preferences = Map.of(
                String.valueOf(applicant1.getApplicantId()), applicant1,
                String.valueOf(applicant2.getApplicantId()), applicant2
        );

        // 3. 测试匹配逻辑
        List<MatchDTO> matchedApplicants = jobCompanyMatcherService.matchJobToApplicants(jobPost, preferences);
        System.out.println("Matched Applicants: " + matchedApplicants);

        // 4. 测试 Kafka 消息生产
        matchedJobPublisher.publishMatchedApplicantToCompany(jobPost, matchedApplicants);

        // 5. 验证 Kafka 消息是否被成功接收
        ConsumerRecord<String, String> received = records.poll(10, TimeUnit.SECONDS);
        assertThat(received).isNotNull();  // 验证消息被接收
        assertThat(received.value()).contains("Software Engineer");  // 检查消息内容
        assertThat(received.value()).contains("hr@techcorp.com");

        System.out.println("Kafka message received: " + received.value());

        // 6. 模拟邮件通知
        CompanyNotificationDTO notification = new CompanyNotificationDTO(
                String.valueOf(jobPost.getJobId()),
                jobPost.getTitle(),
                jobPost.getEmployerEmail(),
                matchedApplicants
        );
        String emailContent = companyNotificationService.generateEmailContent(notification);
        companyNotificationService.sendEmail(jobPost.getEmployerEmail(), "Matching Applicants for Your Job", emailContent);

        // 验证邮件发送逻辑
        System.out.println("Email sent to: " + jobPost.getEmployerEmail());
    }
}
