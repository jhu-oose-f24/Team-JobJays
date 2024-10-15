package com.example.jobjays.controller;

import com.example.jobjays.authentication.TokenGenerator;
import com.example.jobjays.dto.applicant.CreateApplicantDto;
import com.example.jobjays.dto.applicant.LoginApplicationDto;
import com.example.jobjays.dto.applicant.ResponseApplicantDto;
import com.example.jobjays.model.Applicant;
import com.example.jobjays.service.ApplicantService;
import com.example.jobjays.wrapper.EmailSendWrapper;
import jakarta.servlet.http.HttpSession;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final HttpSession session;

    public AuthController(HttpSession session) {
        this.session = session;
    }


    @PostMapping("/login")
    public String login(@RequestBody LoginApplicationDto loginRequest) {
        // Implement login logic here




        boolean isAuthenticated = true; // Replace with actual authentication check

        if (isAuthenticated) {
            session.setAttribute("isLoggedIn", true);
            return "Login successful";
        } else {
            return "Login failed";
        }
    }

    @PostMapping("/logout")
    public String logout() {
        session.invalidate();
        return "Logout successful";
    }
}

