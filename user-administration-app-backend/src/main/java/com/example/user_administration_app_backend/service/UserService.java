package com.example.user_administration_app_backend.service;

import com.example.user_administration_app_backend.model.AppUser;
import com.example.user_administration_app_backend.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AppUser createUser(AppUser user) {
        logger.debug("Encrypting password for user with email: {}", user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        AppUser createdUser = userRepository.save(user);
        
        logger.info("User created with email: {}", createdUser.getEmail());
        return createdUser;
    }

    public void deleteUser(String email) {
        logger.debug("Deleting user with email: {}", email);
        userRepository.deleteById(email);
        logger.info("User with email: {} deleted from repository", email);
    }

    public Optional<AppUser> getUser(String email) {
        logger.debug("Fetching user with email: {}", email);
        return userRepository.findById(email);
    }

    public Page<AppUser> getAllUsers(Pageable pageable) {
        logger.debug("Fetching all users with pagination: {}", pageable);
        return userRepository.findAll(pageable);
    }

    public boolean existsByEmail(String email) {
        logger.debug("Checking existence of user with email: {}", email);
        return userRepository.existsById(email);
    }
        
}
