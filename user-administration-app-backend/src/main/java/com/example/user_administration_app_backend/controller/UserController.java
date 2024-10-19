package com.example.user_administration_app_backend.controller;

import com.example.user_administration_app_backend.dto.UserCreationDTO;
import com.example.user_administration_app_backend.dto.UserDTO;
import com.example.user_administration_app_backend.exception.UserNotFoundException;
import com.example.user_administration_app_backend.mapper.UserMapper;
import com.example.user_administration_app_backend.model.AppUser;
import com.example.user_administration_app_backend.service.UserService;
import com.example.user_administration_app_backend.validation.UserValidator;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserValidator userValidator;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService, UserValidator userValidator) {
        this.userService = userService;
        this.userValidator = userValidator;
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserCreationDTO userCreationDTO) {
        logger.debug("Received request to create user with email: {}", userCreationDTO.getEmail());
        userValidator.validateUserCreation(userCreationDTO);
        AppUser user = UserMapper.toUser(userCreationDTO);
        AppUser createdUser = userService.createUser(user);
        UserDTO userDTO = UserMapper.toDTO(createdUser);

        logger.info("User successfully created with email: {}", createdUser.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
    }

    @GetMapping()
    public ResponseEntity<Page<UserDTO>> getAllUsers(@PageableDefault(size = 4) Pageable pageable) {
        logger.debug("Received request to get all users");
        Page<UserDTO> usersPage = userService.getAllUsers(pageable)
            .map(UserMapper::toDTO);

        logger.info("Returning {} users", usersPage.getTotalElements());
        return ResponseEntity.ok(usersPage);
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String email) {
        logger.debug("Received request to get user with email: {}", email);
        AppUser user = userService.getUser(email)
                .orElseThrow(() -> new UserNotFoundException(email));
    
        UserDTO userDTO = UserMapper.toDTO(user);
        logger.info("User found with email: {}", email);
        return ResponseEntity.ok(userDTO);
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        logger.debug("Received request to delete user with email: {}", email);
        if (!userService.existsByEmail(email)) {
            throw new UserNotFoundException(email);
        }

        userService.deleteUser(email);
        logger.info("User with email {} deleted successfully", email);
        return ResponseEntity.noContent().build();
    }

}
