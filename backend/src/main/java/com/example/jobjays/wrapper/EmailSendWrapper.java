package com.example.jobjays.wrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSendWrapper {

    @Autowired
    private JavaMailSender mailSender;



    public void sendVerificationEmailForEmployer(String recipientEmail, String token){
        String verificationLink = "http://localhost:8080/api/companies/verify?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Email Verification");
        message.setText("Click the following link to verify your email: " + verificationLink);

        mailSender.send(message);
    }

    public void sendVerificationEmail(String recipientEmail, String token) {
        String verificationLink = "http://localhost:8080/api/applicants/verify?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Email Verification");
        message.setText("Click the following link to verify your email: " + verificationLink);

        mailSender.send(message);
    }
}
