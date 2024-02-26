package com.evan.pethomespring.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class UserDTOMapper implements Function<User, UserDTO> {
    @Override
    public UserDTO apply(User user) {
        return new UserDTO(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getOrders(),
                user.getFavorites(),
                user.getCartProds(),
                user.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()),
                user.getUsername()
        );
    }
}
