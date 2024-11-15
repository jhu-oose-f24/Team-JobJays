package org.example.applicant_matcher.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailTestService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailTestService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // 测试邮件发送方法
    public void sendTestEmail() {
        String recipient = "lixinyang0826@gmail.com";  // 替换为你自己的邮箱地址
        String subject = "Test Email from Recruitment System";
        String content = "This is a test email to verify email sending functionality.";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipient);
        message.setSubject(subject);
        message.setText(content);

        try {
            mailSender.send(message);
            System.out.println("Test email sent successfully to " + recipient);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to send test email.");
        }
    }
}
