package com.evan.pethomespring.service;

import com.evan.pethomespring.exception.UserNotFoundException;
import com.evan.pethomespring.model.User;
import com.evan.pethomespring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService{
    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;



    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> findAllUsers() { return userRepository.findAll(); }

    public User findUserById(Long userId) { return userRepository.getReferenceById(userId); }


    public User updateUserById(Long userId, User newUser) throws UserNotFoundException {
        User existUser = userRepository.findById(userId).orElse(null);
        if (existUser != null) {
            existUser.setUsername(newUser.getUsername());
            existUser.setEmail(newUser.getEmail());
            existUser.setPassword(newUser.getPassword());
            existUser.setAvatar(newUser.getAvatar());

            return userRepository.save(existUser);
        } else {
            throw new UserNotFoundException(userId);
        }
    }


    public User getUserByEmail(String email) throws UserNotFoundException {
        if (userRepository.getUserByEmail(email) != null) {
            return userRepository.getUserByEmail(email);
        } else {
            throw new UserNotFoundException(email);
        }
    }

    public List<User> getUserByName(String username) {
        System.out.println("in userServiceImp, get user by username: " + username);
        return userRepository.getUserByName(username);
    }


    public String deleteUserById(Long userId) throws UserNotFoundException{
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException(userId);
        }
       userRepository.deleteById(userId);
       return "User with id: " + userId + " has been deleted successfully!";
    }
}
