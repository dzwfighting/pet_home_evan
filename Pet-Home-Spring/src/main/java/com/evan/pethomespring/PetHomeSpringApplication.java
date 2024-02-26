package com.evan.pethomespring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PetHomeSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(PetHomeSpringApplication.class, args);
    }

}
