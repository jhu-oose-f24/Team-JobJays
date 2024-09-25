package com.example.jobjays.post;

public record Employer(
    String employerName
) {
  // Additional methods or logic can be added here if necessary
  public String getName() {
    return employerName;
  }
}


