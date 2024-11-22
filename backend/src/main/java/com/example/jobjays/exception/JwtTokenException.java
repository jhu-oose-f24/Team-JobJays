package com.example.jobjays.exception;

public class JwtTokenException extends RuntimeException {
  public JwtTokenException(String message) {
    super(message);
  }
}
