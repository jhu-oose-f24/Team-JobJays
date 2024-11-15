package com.jobjays.notification_sender.service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import java.util.Map;
@Service
public class EmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }
    public void sendEmail(String to, String subject, String templateName, Map<String, Object> templateData) throws MessagingException {
        int maxRetries = 5;
        int attempt = 0;
        boolean emailSent = false;
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject(subject);
        Context context = new Context();
        context.setVariables(templateData);
        String html = templateEngine.process(templateName, context);
        helper.setText(html, true);
        while (attempt < maxRetries && !emailSent) {
            try {
                mailSender.send(message);
                emailSent = true;
//                System.out.println(“Email sent to ” + to + “ with subject ” + subject);
            } catch (Exception e) {
                attempt++;
//                System.out.println(“Failed to send email to ” + to + “. Attempt ” + attempt + ” of ” + maxRetries);

                if (attempt >= maxRetries) {
                    throw e;
                }
                try {
                    Thread.sleep(2000); // Wait for 2 seconds before retrying
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    // UTF-8 encoding is used to ensure that special characters are properly encoded
                    throw new MessagingException("Interrupted while waiting to retry sending email", ie);
                }
            }
        }
    }
}