//package com.example.jobjays.auth;
//
//import com.example.jobjays.wrapper.EmailSendWrapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/users")
//public class UserController {
//
//
//  private final AuthService authService;
//  @Autowired
//  private EmailSendWrapper emailSendWrapper;
//
//
//
//  public UserController(AuthService authService) {
//    this.authService = authService;
//  }
//
//  @PostMapping("/login")
//  public String login(@RequestBody UserLoginDto userLoginDto) { //should return token
//    return authService.loginUser(userLoginDto);
//  }
//
//  @GetMapping("/verify")
//  public String enableAccount(@RequestParam("token") String token) { //should return token
//    return authService.enableAccount(token);
//  }
//
//  @PostMapping("/register/applicant")
//  public UserResponseDto registerApplicant(@RequestBody UserCreateDto userCreateDto) {
//    return authService.createUser(userCreateDto);
//  }
//
//  @PostMapping("/register/employer")
//  public UserResponseDto registerEmployer(@RequestBody UserCreateDto userCreateDto) {
//    return authService.createUser(userCreateDto);
//  }
//
//  @PostMapping("/register")
//  public ResponseEntity registerAndVerifyApplicant(@RequestBody UserCreateDto userCreateDto) {
//    UserResponseDto userResponseDto =  authService.createUser(userCreateDto);
//    String token = authService.loginUser(authService.mapToUserLoginDto(userResponseDto.username(), userCreateDto.password(), userCreateDto.role()));
//    emailSendWrapper.sendUserVerificationEmail(authService.getUser(userResponseDto.username()).getEmail(), token);
//
//    return ResponseEntity.ok().build();
//  }
//
//
//}
