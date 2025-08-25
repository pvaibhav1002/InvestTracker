package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.DuplicateUser;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {

    private UserRepo userRepo;

    @Autowired
    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public User createUser(User user) {
        if (userRepo.existsByUsername(user.getUsername())) {
            throw new DuplicateUser(user.getUsername() + " already exists.");
        }
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new DuplicateUser(user.getEmail() + " already exists.");
        }
        return userRepo.save(user);
    }

    @Override
    public LoginDTO loginUser(User user) {
        LoginDTO loginDTO = new LoginDTO("", user.getUsername(), user.getUserRole(), 0L);
        if (userRepo.existsByUsername(user.getUsername())) {
            return loginDTO;
        }
        return null;
    }

}
