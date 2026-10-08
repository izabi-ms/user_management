package com.example.testp.service;

import com.example.testp.model.User;
import com.example.testp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Get all users from PostgreSQL
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID from PostgreSQL
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Save a new user to PostgreSQL
    public User createUser(User user) {
        user.setId(null);
        return userRepository.save(user);
    }
}