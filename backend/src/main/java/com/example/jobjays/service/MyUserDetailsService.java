package com.example.jobjays.service;

import com.example.jobjays.model.*;
import com.example.jobjays.repository.ApplicantRepository;
import com.example.jobjays.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class MyUserDetailsService implements UserDetailsService {

  @Autowired
  private ApplicantRepository applicantRepository;

  @Autowired
  private EmployerRepository employerRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    System.out.println("USER DETAILS Username: " + username);
    Employer employer = employerRepository.findByUsername(username);
    if (employer == null) {
      Applicant applicant = applicantRepository.findByUsername(username);
      if (applicant == null) {
        System.out.println("User Not Found");
        throw new UsernameNotFoundException("user not found");
      }
      return new UserPrincipal(applicant);
    }
    return new UserPrincipal(employer);
  }

}
