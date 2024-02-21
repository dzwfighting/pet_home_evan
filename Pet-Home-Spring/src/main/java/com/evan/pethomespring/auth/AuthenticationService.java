package com.evan.pethomespring.auth;

import com.evan.pethomespring.jwt.JWTUtil;
import com.evan.pethomespring.model.User;
import com.evan.pethomespring.model.UserDTO;
import com.evan.pethomespring.model.UserDTOMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final UserDTOMapper userDTOMapper;
    private final JWTUtil jwtUtil;

    public AuthenticationService(AuthenticationManager authenticationManager, UserDTOMapper userDTOMapper, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDTOMapper = userDTOMapper;
        this.jwtUtil = jwtUtil;
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        System.out.println("AuthenticationResponse request information: " + request.getUsername());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User principal = (User) authentication.getPrincipal();
        UserDTO userDTO = userDTOMapper.apply(principal);
        String token = jwtUtil.issueToken(userDTO.getUsername(), userDTO.getRoles());
        return new AuthenticationResponse(token, userDTO);
    }

}
