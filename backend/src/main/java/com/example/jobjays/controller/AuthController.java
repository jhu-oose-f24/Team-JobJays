package com.example.jobjays.controller;

import com.example.jobjays.authentication.TokenGenerator;
import com.example.jobjays.dto.applicant.CreateApplicantDto;
import com.example.jobjays.dto.applicant.LoginApplicationDto;
import com.example.jobjays.dto.applicant.ResponseApplicantDto;
import com.example.jobjays.dto.employer.ResponseEmployerDto;
import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.Employer;
import com.example.jobjays.service.ApplicantService;
import com.example.jobjays.service.EmployerService;
import com.example.jobjays.wrapper.EmailSendWrapper;
import jakarta.servlet.http.HttpSession;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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

    @Autowired
    private ApplicantService applicantService;

    @Autowired
    private EmployerService employerService;

    private final HttpSession session;

    public AuthController(HttpSession session) {
        this.session = session;
    }


    @PostMapping("/employer")
    public ResponseEntity<ResponseEmployerDto> login(@RequestBody LoginApplicationDto loginRequest) {

        Employer employer = employerService.findEmployerByUsername(loginRequest.getUsername());
        //Applicant applicant = applicantService.findApplicantByUsername(loginRequest.getUsername());
        if (employer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        ResponseEmployerDto employerDto = new ResponseEmployerDto();
        employerDto.setUsername(employer.getUsername());
        employerDto.setEmployer_id(employer.getID());
        employerDto.setFailReason("Password is not correct!");
        if(!employer.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(employerDto);
        }

        employerDto.setFailReason("The account is not enabled! Please verify your email.");
        if(employer.getEnabled()==null || !employer.getEnabled()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(employerDto);
        }


        session.setAttribute("isLoggedIn", true);
        return ResponseEntity.ok(employerDto);
    }

    @PostMapping("/logout")
    public String logout() {
        session.invalidate();
        return "Logout successful";
    }
}

