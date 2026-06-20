package com.fruitgo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fruitgo.dto.LoginRequest;
import com.fruitgo.dto.LoginResponse;
import com.fruitgo.entity.User;
import com.fruitgo.service.UserService;
import com.fruitgo.dto.LoginResponse;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // Register
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    // Login
  @PostMapping("/login")
public LoginResponse login(
        @RequestBody LoginRequest request
) {

    return userService.login(
            request.getEmail(),
            request.getPassword()
    );
}
}