package com.example.jobjays.auth;

public record UserCreateDto(String name, String info, String username, String password, String email, String role) {//role is either Applicant or Employer
}
