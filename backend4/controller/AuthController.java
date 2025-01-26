package org.example.backend4.controller;

import org.example.backend4.dto.CreateAccountRequest;
import org.example.backend4.dto.LoginRequest;
import org.example.backend4.models.User;
import org.example.backend4.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/createAccount")
    public ResponseEntity<String> createAccount(@RequestBody CreateAccountRequest createAccountRequest) {
        return authService.createAccount(createAccountRequest);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginAccount(@RequestBody LoginRequest loginRequest) {
       return authService.checkLogin(loginRequest);
    }
}
