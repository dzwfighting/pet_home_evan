package com.evan.pethomespring.exception;

public class ReviewNotFoundException extends Exception{
    public ReviewNotFoundException(Long id) {
        super("Could not find this review with id " + id);
    }
}
