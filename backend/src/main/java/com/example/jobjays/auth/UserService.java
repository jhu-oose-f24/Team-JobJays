//package com.example.jobjays.auth;
//
//import com.example.jobjays.dto.profile.ResponseProfileDto;
//import com.example.jobjays.model.Applicant;
//import com.example.jobjays.model.Employer;
//import com.example.jobjays.model.Profile;
//import com.example.jobjays.model.User;
//import com.example.jobjays.repository.ApplicantRepository;
//import com.example.jobjays.repository.EmployerRepository;
//import org.springframework.context.annotation.Bean;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import static org.hibernate.validator.internal.util.Contracts.assertTrue;
//
//@Service
//public class UserService implements UserLookupService {
//
//    public ResponseProfileDto mapToResponseProfileDto(Profile profile) {
//        return new ResponseProfileDto(profile.getName(), profile.getBio());
//    }
//    public UserResponseDto mapToUserResponseDto(User user) {
//        return new UserResponseDto(user.getID(), user.getUsername(), user.getClass().toString(),mapToResponseProfileDto(user.getProfile()));
//    }
//
//
//    public UserLoginDto mapToUserLoginDto(String username, String password, String role) {
//        return new UserLoginDto(username, password, role);
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder(10);
//    }
//    private final ApplicantRepository applicantRepository;
//    private final EmployerRepository employerRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    public UserService(ApplicantRepository applicantRepository, EmployerRepository employerRepository, PasswordEncoder passwordEncoder) {
//        this.applicantRepository = applicantRepository;
//        this.employerRepository = employerRepository;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    public Applicant getApplicant(String username) {
//        return applicantRepository.findByUsernameIsIgnoreCase(username);
//    }
//    public Employer getEmployer(String username) {
//        return employerRepository.findByUsernameIsIgnoreCase(username);
//    }
//
//    public User getUser(String username) {
//        Applicant applicant = getApplicant(username);
//        if (applicant != null) {
//            return applicant;
//        }
//        Employer employer = getEmployer(username);
//        if (employer != null) {
//            return employer;
//        }
//        return null;
//    }
//
//    public UserResponseDto createUser(UserCreateDto userCreateDto) {
//       if (userCreateDto.role().equalsIgnoreCase("Applicant")) {
//         Applicant existingUser = getApplicant(userCreateDto.username());
//         if (existingUser != null) {
//           throw new IllegalArgumentException("User already exists");
//         }
//
//           Applicant user = new Applicant();
//           user.setUsername(userCreateDto.username());
//           user.setPassword(passwordEncoder.encode(userCreateDto.password()));
//           user.setEmail(userCreateDto.email());
//           user.getProfile().setBio(userCreateDto.info());
//           user.getProfile().setName(userCreateDto.name());
//           user.setEnabled(false); //needs to get email and login
//           Applicant applicant = applicantRepository.save(user);
//           return mapToUserResponseDto(applicant);
//       } else if (userCreateDto.role().equalsIgnoreCase("Employer")) {
//         Employer existingUser = getEmployer(userCreateDto.username());
//         if (existingUser != null) {
//           throw new IllegalArgumentException("User already exists");
//         }
//
//         Employer user = new Employer();
//           user.setUsername(userCreateDto.username());
//           user.setPassword(passwordEncoder.encode(userCreateDto.password()));
//           user.setEmail(userCreateDto.email());
//           user.getProfile().setName(userCreateDto.name());
//           user.getProfile().setBio(userCreateDto.info());
//           Employer employer = employerRepository.save(user);
//           return mapToUserResponseDto(employer);
//       }
//        return null;
//    }
//
//
//}
