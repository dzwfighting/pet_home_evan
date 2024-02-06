package com.evan.pethomespring.exception;

public class OrderNotFoundException extends Exception{
    public OrderNotFoundException(Long id) {
        super("Could not find this order with the order number is: " + id);
    }
}
