package com.example.user_administration_app_backend.validation;

import com.example.user_administration_app_backend.dto.UserCreationDTO;
import com.example.user_administration_app_backend.exception.EmailAlreadyExistsException;
import com.example.user_administration_app_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class UserValidator {

    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserValidator.class);

    @Autowired
    public UserValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void validateUserCreation(UserCreationDTO userCreationDTO) {
        logger.debug("Validating user creation for email: {}", userCreationDTO.getEmail());
        if (userRepository.existsById(userCreationDTO.getEmail())) {
            logger.warn("Validation failed: Email already exists - {}", userCreationDTO.getEmail());
            throw new EmailAlreadyExistsException(userCreationDTO.getEmail());
        }
        logger.info("User creation validated successfully for email: {}", userCreationDTO.getEmail());
    }
}