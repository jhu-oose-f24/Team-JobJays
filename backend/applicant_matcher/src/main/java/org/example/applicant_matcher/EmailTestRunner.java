package org.example.applicant_matcher;

import org.example.applicant_matcher.service.EmailTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class EmailTestRunner implements CommandLineRunner {

    private final EmailTestService emailTestService;

    @Autowired
    public EmailTestRunner(EmailTestService emailTestService) {
        this.emailTestService = emailTestService;
    }

    @Override
    public void run(String... args) {
        emailTestService.sendTestEmail();  // 调用邮件测试方法
    }
}
