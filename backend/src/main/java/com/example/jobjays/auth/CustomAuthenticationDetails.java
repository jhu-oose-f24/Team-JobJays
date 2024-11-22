package com.example.jobjays.auth;

public class CustomAuthenticationDetails {
    private final String userId;
   //private final String role;

    public CustomAuthenticationDetails(String userId) {
        this.userId = userId;
//        this.role = role;
    }

    public String getUserId() {
        return userId;
    }

//    public String getRole() {
//        return role;
//    }
}
