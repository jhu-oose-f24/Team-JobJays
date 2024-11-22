package com.example.jobjays.auth;

import com.example.jobjays.dto.applicant.CreateApplicantDto;
import com.example.jobjays.dto.employer.CreateEmployerDto;
import com.example.jobjays.dto.profile.ResponseProfileDto;
import com.example.jobjays.exception.UserNotFoundException;
import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.Employer;
import com.example.jobjays.model.Profile;
import com.example.jobjays.model.User;
import com.example.jobjays.repository.ApplicantRepository;
import com.example.jobjays.repository.EmployerRepository;
import com.example.jobjays.service.ApplicantService;
import com.example.jobjays.service.EmployerService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class AuthService {


  @Autowired
  private PasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;

  public AuthService( ApplicantService applicantService, EmployerService employerService,
                     JwtTokenProvider jwtTokenProvider) {
    //this.userLookupService = userLookupService;
    this.jwtTokenProvider = jwtTokenProvider;

  }

  public ResponseProfileDto mapToResponseProfileDto(Profile profile) {
    return new ResponseProfileDto(profile.getName(), profile.getBio());
  }

  public String getUserType() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    // Extract authorities
    Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

    // Check user type
    if (authorities.stream().anyMatch(auth -> auth.getAuthority().equals("APPLICANT"))) {
      return "applicant";
    } else if (authorities.stream().anyMatch(auth -> auth.getAuthority().equals("EMPLOYER"))) {
      return "employer";
    } else {
      throw new UserNotFoundException("Cannot ascertain user type");
    }

  }


  public UserLoginDto mapToUserLoginDto(String username, String password, String role) {
    return new UserLoginDto(username, password, role);
  }


  public String getEmployerEnablementToken(CreateEmployerDto createEmployerDto) {
    return jwtTokenProvider.generateEmployerEnablementToken(createEmployerDto);
  }

  public String getApplicantEnablementToken(CreateApplicantDto createApplicantDto) {
    return jwtTokenProvider.generateApplicantEnablementToken(createApplicantDto);
  }

  public String loginEmployer(Employer employer, String password) {
    if (passwordEncoder.matches(password,employer.getPassword())) {
      return jwtTokenProvider.generateEmployerToken(employer);
    }
    return null;
  }

  public String loginApplicant(Applicant applicant, String password) {
    if (passwordEncoder.matches(password,applicant.getPassword())) {
      return jwtTokenProvider.generateApplicantToken(applicant);
    }
    return null;
  }

  public Claims getClaims(String token) {
    return jwtTokenProvider.getClaimsFromToken(token);
  }
  public String extractRole(String token) {
    return jwtTokenProvider.extractRole(token);
  }

  public String extractUsername(String token) {
    return jwtTokenProvider.extractUserName(token);
  }

  public Long extractId(String token) {
    return jwtTokenProvider.extractId(token);
  }




}
