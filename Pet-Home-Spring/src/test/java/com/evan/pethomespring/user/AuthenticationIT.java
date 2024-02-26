package com.evan.pethomespring.user;

import com.evan.pethomespring.auth.AuthenticationRequest;
import com.evan.pethomespring.auth.AuthenticationResponse;
import com.evan.pethomespring.jwt.JWTUtil;
import com.evan.pethomespring.model.Roles;
import com.evan.pethomespring.model.UserDTO;
import com.evan.pethomespring.model.UserRegistrationRequest;
import com.github.javafaker.Faker;
import com.github.javafaker.Name;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.EntityExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.UUID;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = RANDOM_PORT)
public class AuthenticationIT {
    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private JWTUtil jwtUtil;

//    private static final Random RANDOM = new Random();
    private static final String AUTHENTICATION_PATH = "/auth";
    private static final String USER_PATH = "/user/register";

    @Test
    void canLogin() {
        Faker faker = new Faker();
        Name fakerName = faker.name();
        String name = fakerName.fullName();
        String email = fakerName.lastName() + "-" + UUID.randomUUID() + "@gmail.com";
        String password = "password";
        Roles role = Roles.USER;

        UserRegistrationRequest userRegisteration = new UserRegistrationRequest(name, email, password, role);
        AuthenticationRequest authenticationRequest = new AuthenticationRequest(email, password);

        webTestClient.post()
                .uri(AUTHENTICATION_PATH + "/login")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(authenticationRequest), AuthenticationRequest.class)
                .exchange()
                .expectStatus()
                .isUnauthorized();

        webTestClient.post()
                .uri(USER_PATH)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(
                        Mono.just(userRegisteration),
                        UserRegistrationRequest.class
                )
                .exchange()
                .expectStatus()
                .isOk();

        EntityExchangeResult<AuthenticationResponse> result = webTestClient.post()
                .uri(AUTHENTICATION_PATH + "/login")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(authenticationRequest), AuthenticationRequest.class)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(new ParameterizedTypeReference<AuthenticationResponse>(){
                })
                .returnResult();

        String jwtToken = result.getResponseHeaders()
                .get(HttpHeaders.AUTHORIZATION)
                .get(0);

        AuthenticationResponse authenticationResponse = result.getResponseBody();

        UserDTO userDTO = authenticationResponse.getUserDTO();

        assertThat(jwtUtil.isTokenValid(jwtToken, userDTO.getUsername())).isTrue();

        System.out.println("username: " + userDTO.getUsername() + "name: " + userDTO.getName() + "email: " + userDTO.getEmail() + "roles: " + userDTO.getRoles());
        assertThat(userDTO.getUsername()).isEqualTo(email);
        assertThat(userDTO.getName()).isEqualTo(name);
        assertThat(userDTO.getEmail()).isEqualTo(email);
        assertThat(userDTO.getRoles()).isEqualTo(Arrays.asList("ROLE_USER"));
    }
}
