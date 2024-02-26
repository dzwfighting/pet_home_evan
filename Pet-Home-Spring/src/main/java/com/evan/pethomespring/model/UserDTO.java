package com.evan.pethomespring.model;

import java.util.List;
import java.util.Objects;

public class UserDTO {
    private final Long userId;
    private final String name;
    private final String email;
    private final Roles role;
    private final List<Order> order;
    private final List<Product> favorites;
    private final List<CartProd> cartProds;
    private final List<String> roles;
    private final String username;

    public UserDTO(Long userId, String name, String email, Roles role, List<Order> order, List<Product> favorites, List<CartProd> cartProds, List<String> roles, String username) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
        this.order = order;
        this.favorites = favorites;
        this.cartProds = cartProds;
        this.roles = roles;
        this.username = username;
    }

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Roles getRole() {return role; }

    public List<Order> getOrder() {
        return order;
    }

    public List<Product> getFavorites() {
        return favorites;
    }

    public List<CartProd> getCartProds() {
        return cartProds;
    }

    public List<String> getRoles() {
        return roles;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserDTO)) return false;
        UserDTO userDTO = (UserDTO) o;
        return Objects.equals(userId, userDTO.userId) && Objects.equals(name, userDTO.name) && Objects.equals(email, userDTO.email) && role == userDTO.role && Objects.equals(order, userDTO.order) && Objects.equals(favorites, userDTO.favorites) && Objects.equals(cartProds, userDTO.cartProds) && Objects.equals(roles, userDTO.roles) && Objects.equals(username, userDTO.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, name, email, role, order, favorites, cartProds, roles, username);
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", order=" + order +
                ", favorites=" + favorites +
                ", cartProds=" + cartProds +
                ", roles=" + roles +
                ", username='" + username + '\'' +
                '}';
    }
}
