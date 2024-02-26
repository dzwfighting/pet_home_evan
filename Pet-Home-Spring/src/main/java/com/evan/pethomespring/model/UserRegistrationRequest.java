package com.evan.pethomespring.model;

import java.util.Objects;

public class UserRegistrationRequest {
    private final String name;
    private final String email;
    private final String password;
    private final Roles role;


    public UserRegistrationRequest(String name, String email, String password, Roles role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Roles getRole() {return role;}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserRegistrationRequest)) return false;
        UserRegistrationRequest that = (UserRegistrationRequest) o;
        return Objects.equals(name, that.name) && Objects.equals(email, that.email) && Objects.equals(password, that.password) && role == that.role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, email, password, role);
    }

    @Override
    public String toString() {
        return "UserRegistrationRequest{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                '}';
    }
}
