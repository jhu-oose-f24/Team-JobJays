package com.example.jobjays.auth;

public class CustomAuthenticationDetails {
    private final String userId;

    public CustomAuthenticationDetails(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }
}
