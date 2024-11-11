package com.example.jobjays.authentication;
import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Aspect
@Component
public class LoginAspect {

    private final HttpSession session;

    public LoginAspect(HttpSession session) {
        this.session = session;
    }

    @Before("@annotation(LoginRequired)")
    public void checkLoginStatus() {
        Boolean isLoggedIn = (Boolean) session.getAttribute("isLoggedIn");

        if (isLoggedIn == null || !isLoggedIn) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not logged in");
        }
    }
}
