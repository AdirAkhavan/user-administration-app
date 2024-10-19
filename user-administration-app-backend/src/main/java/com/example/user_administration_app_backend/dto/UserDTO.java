package com.example.user_administration_app_backend.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserDTO {
    private final String email;
    private final String firstName;
    private final String lastName;
}
