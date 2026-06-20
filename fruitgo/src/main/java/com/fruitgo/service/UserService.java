package com.fruitgo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fruitgo.dto.LoginResponse;
import com.fruitgo.entity.User;
import com.fruitgo.repository.UserRepository;
import com.fruitgo.security.JwtUtil;

@Service
public class UserService {

@Autowired
private UserRepository userRepository;

@Autowired
private PasswordEncoder passwordEncoder;

// Register User
public User register(User user) {

    user.setPassword(
            passwordEncoder.encode(
                    user.getPassword()
            )
    );

    if(user.getEmail().equals("admin@gmail.com")) {
        user.setRole("ADMIN");
    } else {
        user.setRole("USER");
    }

    return userRepository.save(user);
}

// Login User
public LoginResponse login(
        String email,
        String password
) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException(
                            "User not found"
                    ));

    if (passwordEncoder.matches(
            password,
            user.getPassword()
    )) {

        String token =
                JwtUtil.generateToken(email);

        return new LoginResponse(
                token,
                "Login Successful",
                user.getRole()
        );
    }

    throw new RuntimeException(
            "Invalid Password"
    );
}

}
