package com.example.jobjays.auth;

import com.example.jobjays.dto.profile.ResponseProfileDto;

public record UserResponseDto(Long id, String username, String role, ResponseProfileDto profile) {
}
