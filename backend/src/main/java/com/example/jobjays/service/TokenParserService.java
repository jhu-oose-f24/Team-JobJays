package com.example.jobjays.service;

import com.example.jobjays.auth.CustomAuthenticationDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class TokenParserService {
    public Long getCurrentUserId() {
        CustomAuthenticationDetails details = (CustomAuthenticationDetails)
                SecurityContextHolder.getContext().getAuthentication().getDetails();
        return details != null ? Long.parseLong(details.getUserId()) : null;
    }
}
