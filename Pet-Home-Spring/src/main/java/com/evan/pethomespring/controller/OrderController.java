package com.evan.pethomespring.controller;

import com.evan.pethomespring.service.OrderServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
    @Autowired
    OrderServiceImp orderServiceImp;

//    @GetMapping("/addorder")

}
