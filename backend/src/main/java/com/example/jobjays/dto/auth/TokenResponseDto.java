package com.example.jobjays.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

// Data Transfer Object for Token Response
// Could be added: refresh token - it needs extra security measures: https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/
@Data
public class TokenResponseDto {
    public TokenResponseDto(String accessToken) {
        this.accessToken = accessToken;
    }
    private String accessToken;
    private String tokenType = "Bearer";
}
