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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

@Service
public class JwtTokenProvider {

 @Value("${jwt.secret}")
 private String secretKey;


  public SecretKey getSecretKey(){
    //System.out.println(secretKey);
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

  public String extractUserName(String token) {
    // Extract the username (subject) from the JWT token
    //String username = extractClaim(token, Claims::getSubject);
    final Claims claims = extractAllClaims(token);
    String username = claims.get("username", String.class);
    System.out.println("EXTRACT JWT Username: " + username);

    return username;
  }

  public String extractId(String token) {

    final Claims claims = extractAllClaims(token);
    Integer userId = claims.get("id", Integer.class);
    System.out.println("EXTRACT JWT userId: " + userId);

    return userId != null ? userId.toString() : null;
  }


  private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    System.out.println(claims.toString());
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parserBuilder()  // Use parserBuilder() for the new JJWT version
        .setSigningKey(getSecretKey())  // Correct method to set the signing key
        .build()
        .parseClaimsJws(token)  // Use parseClaimsJws() for signed JWTs
        .getBody();
  }



  public Claims getClaimsFromToken(String token) {
    return Jwts.parserBuilder()
      .setSigningKey(getSecretKey())
      .build()
      .parseClaimsJws(token)
      .getBody();
  }

  public boolean validateToken(String token, UserDetails userDetails) {
    final String userName = extractUserName(token);
    return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
  }


  private boolean isTokenExpired(String token) {
    Claims claims = getClaimsFromToken(token);
    Date expiry = claims.getExpiration();
    return expiry.before(new Date());
  }




}


