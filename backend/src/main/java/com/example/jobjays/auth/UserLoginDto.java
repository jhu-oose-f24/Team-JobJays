package com.example.jobjays.auth;


import jakarta.validation.constraints.NotNull;

public record UserLoginDto(
    @NotNull String username,
    @NotNull String password,
    @NotNull String role) {
}
