package com.example.jobjays.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtTokenProvider {
  //@Getter
  //private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);


 @Value("${jwt.secret}")
 private String secretKey;
// @Getter
// private Key key;
//
//  @PostConstruct
//  public void init() {
//    // Convert the secret key string to a Key object
//    key = Keys.hmacShaKeyFor(secretKey.getBytes());
//  }

  public Key getSecretKey(){
    System.out.println(secretKey);
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public static String generateEnablementToken() { //TODO will remove this
    return UUID.randomUUID().toString();
  }
  public String generateToken(UserResponseDto userResponseDto) { //add roles to user login, response dtos
    Map<String, Object> claims = new HashMap<>();
    claims.put("id", userResponseDto.id());
    claims.put("username", userResponseDto.username());
    claims.put("role", userResponseDto.role());
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + 86400000);

    return Jwts.builder()
        .setSubject(userResponseDto.username())
        .setClaims(claims)
        .setIssuedAt(now)
        .setExpiration(expiryDate)
        .signWith(getSecretKey(), SignatureAlgorithm.HS256)
        .compact();
  }

  public String getUsernameFromToken(String token) {
    return Jwts.parserBuilder()
      .setSigningKey(getSecretKey())
      .build()
      .parseClaimsJws(token)
      .getBody()
      .getSubject();
  }

  public Claims getClaimsFromToken(String token) {
    return Jwts.parserBuilder()
      .setSigningKey(getSecretKey())
      .build()
      .parseClaimsJws(token)
      .getBody();
  }




}


