package com.evan.pethomespring.auth;

import java.util.Objects;

public class AuthenticationRequest {
    private final String username;
    private final String password;

    public AuthenticationRequest(String username, String password) {
        System.out.println("Authentication Request username: " + username);
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AuthenticationRequest)) return false;
        AuthenticationRequest that = (AuthenticationRequest) o;
        return Objects.equals(username, that.username) && Objects.equals(password, that.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, password);
    }

    @Override
    public String toString() {
        return "AuthenticationRequest{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
