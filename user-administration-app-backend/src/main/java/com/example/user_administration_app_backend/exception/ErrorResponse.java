package com.example.user_administration_app_backend.exception;

import java.util.List;

public class ErrorResponse {
    private List<String> errors;

    public ErrorResponse(List<String> errors) {
        this.errors = errors;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }
}
