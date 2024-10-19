package com.example.user_administration_app_backend.dto;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserCreationDTO {

    @Email(message = "Invalid Email address")
    @NotBlank(message = "Email can't be empty")
    private String email;

    @NotBlank(message = "First name can't be empty")
    private String firstName;

    @NotBlank(message = "Last name can't be empty")
    private String lastName;

    @NotBlank(message = "Password can't be empty")
    @Size(min = 5, message = "Password must be at least 5 characters long")
    private String password;
}