package com.evan.pethomespring.auth;

import com.evan.pethomespring.model.UserDTO;

import java.util.Objects;

public class AuthenticationResponse {
    private final String token;
    private final UserDTO userDTO;

    public AuthenticationResponse(String token, UserDTO userDTO) {
        this.token = token;
        this.userDTO = userDTO;
    }

    public String getToken() {
        return token;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AuthenticationResponse)) return false;
        AuthenticationResponse that = (AuthenticationResponse) o;
        return Objects.equals(token, that.token) && Objects.equals(userDTO, that.userDTO);
    }

    @Override
    public String toString() {
        return "AuthenticationResponse{" +
                "token='" + token + '\'' +
                ", userDTO=" + userDTO +
                '}';
    }
}
