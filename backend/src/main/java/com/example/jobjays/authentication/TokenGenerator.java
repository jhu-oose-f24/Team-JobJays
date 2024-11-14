package com.example.jobjays.authentication;
import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.Employer;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


import java.util.UUID;

public class TokenGenerator {
    public static String generateToken() {
        return UUID.randomUUID().toString();
    }
    // Generate a secure key (you can use a static key in real applications)
        private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        // Token expiration time: 1 day in milliseconds
        private static final long EXPIRATION_TIME = 86400000L;

        // Generate a token without user details (general use)
        private static String generateTokenForUsers() {
            return Jwts.builder()
                    .setSubject("General Token")
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .signWith(key)
                    .compact();
        }

        // Generate a token for an Applicant
        public static String generateToken(Applicant applicant) {
            Map<String, Object> claims = new HashMap<>();
            claims.put("id", applicant.getID());
            claims.put("username", applicant.getUsername());
            claims.put("email", applicant.getEmail());
            claims.put("role", "Applicant");

            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(applicant.getName())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .signWith(key)
                    .compact();
        }

        // Generate a token for an Employer
        public static String generateToken(Employer employer) {
            Map<String, Object> claims = new HashMap<>();
            claims.put("id", employer.getID());
            claims.put("username", employer.getUsername());
            claims.put("email", employer.getEmail());
            claims.put("company", employer.getName());
            claims.put("role", "Employer");

            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(employer.getName())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .signWith(key)
                    .compact();
        }
    }

