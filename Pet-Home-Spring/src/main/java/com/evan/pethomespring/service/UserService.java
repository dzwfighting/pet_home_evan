package com.evan.pethomespring.service;

import com.evan.pethomespring.exception.UserNotFoundException;
import com.evan.pethomespring.model.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);
    public List<User> findAllUsers();
    public User findUserById(Long userId);
    public User updateUserById(Long userId, User newUser) throws UserNotFoundException;
    public User getUserByEmail(String email) throws UserNotFoundException;
    public List<User> getUserByName(String username);
    public String deleteUserById(Long userId) throws UserNotFoundException;
}
