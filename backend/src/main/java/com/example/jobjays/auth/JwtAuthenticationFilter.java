package com.example.jobjays.auth;

import com.example.jobjays.model.Applicant;
import com.example.jobjays.model.Employer;
import com.example.jobjays.repository.ApplicantRepository;
import com.example.jobjays.repository.EmployerRepository;
import com.example.jobjays.service.ApplicantService;
import com.example.jobjays.service.EmployerService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Key;
import java.util.Date;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  //private final UserService userService;
  private final JwtTokenProvider jwtTokenProvider;
  private final ApplicantService applicantService;
  private final EmployerService employerService;


  public JwtAuthenticationFilter(ApplicantService applicantService, EmployerService employerService, JwtTokenProvider jwtTokenProvider) {
    //this.userService = userService;
    this.applicantService = applicantService;
    this.employerService = employerService;
    this.jwtTokenProvider = jwtTokenProvider;
  }


  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    String token = getJwtFromRequest(request);
    System.out.println("Token: " + token);
    if (token != null && validateToken(token)) {
      //String username = jwtTokenProvider.getUsernameFromToken(token);
      String username = getSubject(token);
      UserDetails userDetails = getUser(username); //look up authorities in user details
      UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
      SecurityContextHolder.getContext().setAuthentication(authentication);
    }
  filterChain.doFilter(request, response);
  }

  private UserDetails getUser(String username) {
    Applicant applicant = applicantService.findApplicantByUsername(username);
    if (applicant != null) {
      return (UserDetails) applicant;
    } else {
      Employer employer = employerService.findEmployerByUsername(username);
      return (UserDetails) employer;
    }
  }

  private String getJwtFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }


  private boolean validateToken(String token) {
    try {
      // Parse the token to extract claims
      Claims claims = Jwts.parserBuilder()
          .setSigningKey(jwtTokenProvider.getSecretKey()).build()
          .parseClaimsJws(token)
          .getBody();
      ;
      // Check if the token is expired
      return !claims.getExpiration().before(new Date());
    } catch (ExpiredJwtException ex) {
      // Handle the token expiration case
      System.out.println("Token has expired: " + ex.getMessage());
      return false;
    } catch (SignatureException ex) {
      // Handle the case where the signature is invalid

      System.out.println("Invalid JWT signature: " + ex.getMessage());
      return false;
    } catch (Exception ex) {
      // Handle any other exceptions
      System.out.println("Invalid token: " + ex.getMessage());
      return false;
    }
  }

  private String getSubject(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(jwtTokenProvider.getSecretKey()).build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
  }

}
