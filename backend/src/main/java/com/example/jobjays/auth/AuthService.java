package com.example.jobjays.auth;

import com.example.jobjays.dto.applicant.CreateApplicantDto;
import com.example.jobjays.dto.employer.CreateEmployerDto;
import com.example.jobjays.dto.profile.ResponseProfileDto;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  //private final UserLookupService userLookupService;

  @Autowired
  private PasswordEncoder passwordEncoder;


  private final ApplicantService applicantService;
  private final EmployerService employerService;
  private final JwtTokenProvider jwtTokenProvider;




  public AuthService( ApplicantService applicantService, EmployerService employerService,
                     JwtTokenProvider jwtTokenProvider) {
    //this.userLookupService = userLookupService;
    this.jwtTokenProvider = jwtTokenProvider;
    this.applicantService = applicantService;
    this.employerService = employerService;
  }

  public ResponseProfileDto mapToResponseProfileDto(Profile profile) {
    return new ResponseProfileDto(profile.getName(), profile.getBio());
  }
  public UserResponseDto mapToUserResponseDto(User user) {
    return new UserResponseDto(user.getID(), user.getUsername(), user.getClass().toString(),mapToResponseProfileDto(user.getProfile()));
  }


  public UserLoginDto mapToUserLoginDto(String username, String password, String role) {
    return new UserLoginDto(username, password, role);
  }

  public UserResponseDto validateUser(UserLoginDto userLoginDto) {
    User user = getUser(userLoginDto.username());
    if (user == null) {
      return null;
    }
    if (passwordEncoder.matches(userLoginDto.password(), user.getPassword())) {
      return mapToUserResponseDto(user);
    }
    return null;
  }


  //loginUser
  public String loginUser(UserLoginDto userLoginDto) {
    UserResponseDto userResponseDto = validateUser(userLoginDto);
    if (userResponseDto == null) {
      return null;
    }
    return jwtTokenProvider.generateToken(userResponseDto);
  }

  //decodeToken
  public String decodeToken(String token) {
    String username =  jwtTokenProvider.getUsernameFromToken(token);
    Employer employer = getEmployer(username);
    if (employer == null) {
       Applicant applicant = getApplicant(username);
       return applicant.getUsername();
    }
    return employer.getUsername();
  }

  public Claims getClaims(String token) {
    return jwtTokenProvider.getClaimsFromToken(token);
  }

  public Applicant getApplicant(String username) {
    return applicantService.findApplicantByUsername(username);
  }
  public Employer getEmployer(String username) {
    return employerService.findEmployerByUsername(username);
  }

  public User getUser(String username) {
    Applicant applicant = getApplicant(username);
    if (applicant != null) {
      return applicant;
    }
    Employer employer = getEmployer(username);
    if (employer != null) {
      return employer;
    }
    return null;
  }

  public UserResponseDto createUser(UserCreateDto userCreateDto) {
    if (userCreateDto.role().equalsIgnoreCase("Applicant")) {
      System.out.println("Creating applicant");
      System.out.println(userCreateDto.username());
      Applicant existingUser = getApplicant(userCreateDto.username());
      if (existingUser != null) {
        throw new IllegalArgumentException("User already exists");
      }

      CreateApplicantDto user = new CreateApplicantDto();
      user.setUsername(userCreateDto.username());
      user.setPassword(passwordEncoder.encode(userCreateDto.password()));
      user.setEmail(userCreateDto.email());
      user.setApplicantInfo(userCreateDto.info());
      user.setApplicantName(userCreateDto.name());
      user.setEnabled(false); //needs to get email and login
      Applicant applicant = applicantService.addApplicant(user);
      System.out.println("Applicant:" + applicant.toString());
      return mapToUserResponseDto(applicant);
    } else if (userCreateDto.role().equalsIgnoreCase("Employer")) {
      Employer existingUser = getEmployer(userCreateDto.username());
      if (existingUser != null) {
        throw new IllegalArgumentException("User already exists");
      }

      CreateEmployerDto user = new CreateEmployerDto();
      user.setUsername(userCreateDto.username());
      user.setPassword(passwordEncoder.encode(userCreateDto.password()));
      user.setEmail(userCreateDto.email());
      user.setEmployerName(userCreateDto.name());
      user.setEmployerInfo(userCreateDto.info());
      Employer employer = employerService.addEmployer(user);
      return mapToUserResponseDto(employer);
    }
    return null;
  }

  public String enableAccount(String token) {
    Claims claims = getClaims(token);
    String role = (String) claims.get("role");
    String username = (String) claims.get("username");
    if (role.equalsIgnoreCase("applicant")) {
      Applicant applicant = getApplicant(username);
      applicant.setEnabled(true);
      applicantService.updateApplicantNoDto(applicant, applicant.getID());
    } else {
      Employer employer = getEmployer(username);
      employer.setEnabled(true);
      employerService.updateEmployerNoDto(employer, employer.getID());
    }
    return token;
  }


}
