package com.evan.pethomespring.exception;

public class ProductNotFoundException extends Exception{
    public ProductNotFoundException(Long id) {
        super("Could not find the product with id " + id);
    }
}
