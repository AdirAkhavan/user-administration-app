package com.example.user_administration_app_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.user_administration_app_backend.model.AppUser;

@Repository
public interface UserRepository extends JpaRepository<AppUser, String> {
}