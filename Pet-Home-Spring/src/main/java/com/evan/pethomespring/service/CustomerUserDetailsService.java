package com.evan.pethomespring.service;

import com.evan.pethomespring.model.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomerUserDetailsService implements UserDetailsService {
    private final UserService userService;

    @Autowired
    public CustomerUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername(): " + username);
//        System.out.println("userService.getUserByEmail(username): " + userService.getUserByEmail(username));
//        return userService.getUserByEmail(username);
        UserDetails userDetails = userService.getUserByEmail(username);
        if (userDetails == null) throw new UsernameNotFoundException(username);
        return userDetails;
//
//        return org.springframework.security.core.userdetails.User
//                .withUsername(user.getUsername())
//                .password(user.getPassword())
//                .roles("USER")
//                .build();
    }
}
