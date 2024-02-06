package com.evan.pethomespring.controller;

import com.evan.pethomespring.model.User;
import com.evan.pethomespring.service.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserServiceImp userServiceImp;

    @PostMapping("/register")
    User newUser(@RequestBody User newUser) throws Exception{
        System.out.println("For now, we will add new user, this is user's username: " + newUser.getUsername() + " this is user's email: " + newUser.getEmail());
        try {
            if (userServiceImp.getUserByEmail(newUser.getEmail()) != null)
                return userServiceImp.saveUser(newUser);
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;

    }

    @GetMapping("/login")
    public String login() {
        System.out.println("in login function");
        return "login";
    }

    @GetMapping("/users")
    List<User> getAllUsers(){
        System.out.println("for get all users' data");
        return userServiceImp.findAllUsers();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        System.out.println("find user by id");
        return userServiceImp.findUserById(id);
    }

    @PostMapping("/user/search")
    List<User> getUserByName(@RequestBody User user) {
        System.out.println("in controller, find user by username");
        return userServiceImp.getUserByName(user.getUsername());
    }

    @PutMapping("/user/{id}")
    User updateUser(@PathVariable Long id, @RequestBody User newUser) {
        System.out.println("For update the data of current user");
        System.out.println(newUser);
        try {
            return userServiceImp.updateUserById(id, newUser);
        }catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id) {
        System.out.println("For delete current user, the id is: " + id);
        try {
            return userServiceImp.deleteUserById(id);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }


    }
}
