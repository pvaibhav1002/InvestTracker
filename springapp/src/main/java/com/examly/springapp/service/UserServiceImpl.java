package com.examly.springapp.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.exception.DuplicateUser;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {

    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;
    private JwtUtils jwtUtils;
    private AuthenticationManager authenticationManager;

    @Autowired
    public UserServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder, JwtUtils jwtUtils,
            AuthenticationManager authenticationManager) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public User createUser(User user) {
        if (userRepo.existsByUsername(user.getUsername())) {
            throw new DuplicateUser(user.getUsername() + " already exists.");
        }
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new DuplicateUser(user.getEmail() + " already exists.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public LoginDTO loginUser(User user) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            Map<String, Object> claims = new HashMap<>();
            User newUser = userRepo.findByEmail(user.getEmail());
            claims.put("userId", newUser.getUserId());
            claims.put("role", newUser.getUserRole());
            claims.put("username", newUser.getUsername());
            return new LoginDTO(jwtUtils.generateToken(newUser.getEmail(), claims));
        }
        throw new RuntimeException("Invalid Credentials");
    }

}
