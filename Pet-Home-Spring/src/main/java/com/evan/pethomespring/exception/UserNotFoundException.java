package com.evan.pethomespring.exception;

public class UserNotFoundException extends Exception{
    public UserNotFoundException(Long id) {
        super("Could not find the user with id " + id);
    }
    public UserNotFoundException(String email) {
        super("Could not find the user with this email: " + email);
    }
}
