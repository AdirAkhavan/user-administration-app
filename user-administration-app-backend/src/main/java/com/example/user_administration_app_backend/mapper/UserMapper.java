package com.example.user_administration_app_backend.mapper;

import com.example.user_administration_app_backend.dto.UserCreationDTO;
import com.example.user_administration_app_backend.dto.UserDTO;
import com.example.user_administration_app_backend.model.AppUser;

public class UserMapper {

    public static AppUser toUser(UserCreationDTO dto) {
        return new AppUser(dto.getEmail(), dto.getFirstName(), dto.getLastName(), dto.getPassword());
    }

    public static UserDTO toDTO(AppUser user) {
        return new UserDTO(user.getEmail(), user.getFirstName(), user.getLastName());
    }
}
