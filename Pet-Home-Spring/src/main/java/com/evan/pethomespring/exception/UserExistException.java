package com.evan.pethomespring.exception;

public class UserExistException extends Exception{
    public UserExistException(String username) {super(username + " already exist, please try again");}
}
