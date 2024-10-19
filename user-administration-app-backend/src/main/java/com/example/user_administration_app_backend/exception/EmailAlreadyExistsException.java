package com.example.user_administration_app_backend.exception;

public class EmailAlreadyExistsException extends RuntimeException {
    
    private final String email;
    
    public EmailAlreadyExistsException(String email) {
        super("Email " + email + " is already in use");
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}
