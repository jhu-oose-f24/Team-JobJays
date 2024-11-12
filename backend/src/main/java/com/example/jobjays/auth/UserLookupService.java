package com.example.jobjays.auth;

import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.Employer;
import com.example.jobjays.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;

public interface UserLookupService {
  User getUser(String username);
  Employer getEmployer(String username);
  Applicant getApplicant(String username);

  UserResponseDto mapToUserResponseDto(User user);
  PasswordEncoder passwordEncoder();
}
