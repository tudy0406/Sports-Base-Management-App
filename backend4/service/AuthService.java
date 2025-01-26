package org.example.backend4.service;

import org.example.backend4.dto.LoginRequest;
import org.example.backend4.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.example.backend4.dto.CreateAccountRequest;

@Service
public class AuthService {

    private final EmployeeService employeeService;
    private final CustomerService customerService;
    private final UserService userService;

    @Autowired
    public AuthService(EmployeeService employeeService, CustomerService customerService, UserService userService) {
        this.employeeService = employeeService;
        this.customerService = customerService;
        this.userService = userService;
    }

    public ResponseEntity<String> createAccount(CreateAccountRequest createAccountRequest) {

        switch (checkNewAccount(createAccountRequest)) {
            case 1:
                return ResponseEntity.status(400).body("Error: Email already exists " );
            case 2:
                return ResponseEntity.status(400).body("Error: Employee password incorrect" );
            case 3:
                break;
        }

        if(createAccountRequest.getRole().equals("employee")){
            employeeService.saveAccount(createAccountRequest);
            return ResponseEntity.status(201).body("Employee account created successfully.");
        } else {
            customerService.saveAccount(createAccountRequest);
            return ResponseEntity.status(201).body("Customer account created successfully.");
        }

    }


    ///Check login credentials
    public ResponseEntity<User> checkLogin(LoginRequest loginRequest) {
        User user = findAccount(loginRequest.getEmail());
        if(user == null){
            return ResponseEntity.status(404).body(null);
        }
        if(!user.getPassword().equals(loginRequest.getPassword())){
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.ok(user);
    }

    public User findAccount(String email) {
        return userService.getUserByEmail(email);
    }

    ///Check if the account can be created
    private int checkNewAccount(CreateAccountRequest request) {
        if(findAccount(request.getEmail())!=null){
            return 1;
        }
        if(request.getRole().equals("employee")){
            if(!employeeService.checkEmployeePassword(request.getEmployeePassword()))
                return 2;
        }
        return 3;
    }



}
