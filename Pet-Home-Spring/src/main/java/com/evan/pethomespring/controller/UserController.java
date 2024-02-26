package com.evan.pethomespring.controller;

import com.evan.pethomespring.exception.UserExistException;
import com.evan.pethomespring.jwt.JWTUtil;
import com.evan.pethomespring.model.Order;
import com.evan.pethomespring.model.Product;
import com.evan.pethomespring.model.User;
import com.evan.pethomespring.model.UserRegistrationRequest;
import com.evan.pethomespring.service.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    UserServiceImp userServiceImp;

    private final JWTUtil jwtUtil;

    public UserController(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

//    @PostMapping("/users")
//    User newUser(@RequestBody User newUser) throws Exception{
//        System.out.println("For now, we will add new user, this is user's username: " + newUser.getUsername() + " this is user's email: " + newUser.getEmail());
//        if (userServiceImp.getUserByEmail(newUser.getEmail()) != null) {
//            System.out.println("This user already registered, please try again");
//            throw new UserExistException(newUser.getUsername());
//        }
//        return userServiceImp.saveUser(newUser);
//    }

    @PostMapping("/user/register")
    public ResponseEntity<?> registerCustomer(@RequestBody UserRegistrationRequest request) {
        System.out.println("For now, we will check if login then add to new user, this is user's name: " + request.getName() + " this is user's email: " + request.getEmail() + " user role: " + request.getRole());
        User user = new User(request.getName(), request.getEmail(), request.getPassword(), request.getRole());
        userServiceImp.saveUser(user);
        String jwtToken = jwtUtil.issueToken(request.getEmail(), request.getRole(), "ROLE_USER");
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, jwtToken)
                .build();
    }


//    @GetMapping("/login")
//    public String login() {
//        System.out.println("in login function");
//        return "login";
//    }

    @GetMapping("/users")
    List<User> getAllUsers(){
        System.out.println("for get all users' data");
        return userServiceImp.findAllUsers();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        System.out.println("find user by id");
        return userServiceImp.findUserById(id);
    }

    @GetMapping("/finduser/{email}")
    User getUserByEmail(@PathVariable String email) {
        System.out.println("find user by email");
        return userServiceImp.getUserByEmail(email);
    }

    @GetMapping("/user/search/{username}")

    List<User> getUserByName(@PathVariable String username) {
        System.out.println("in controller, find user by username");
        return userServiceImp.getUserByName(username);
    }

    @PutMapping("/user/{id}")
    User updateUser(@PathVariable Long id, @RequestBody User newUser) {
        System.out.println("For update the data of current user");
        System.out.println(newUser);
        try {
            return userServiceImp.updateUserById(id, newUser);
        }catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

//    @PutMapping("/user/{userId}/addfavorite/{productId}/")
//    User addFavoriteProd(@PathVariable Long userId, @PathVariable Long productId) {
//        System.out.println("For add product in current user");
//        System.out.println("userId: " + userId + " product: " + productId);
//        try {
//            return userServiceImp.addFavoriteProd(userId, productId);
//        }catch (Exception e) {
//            System.out.println(e);
//        }
//        return null;
//    }

    @GetMapping("/user/{userId}/orders/{orderId}")
    Order getOrderById(@PathVariable Long userId, @PathVariable Long orderId) {
        System.out.println("Controller: User get correspond order by using orderId");
        System.out.println("userId: " + userId + "orderId: " + orderId);
        try {
            return userServiceImp.getOrderById(userId, orderId);
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    @GetMapping("/user/{userId}/orders")
    List<Order> getAllOrdersById(@PathVariable Long userId) {
        System.out.println("get all orders for current user: " + userId);
        try {
            return userServiceImp.getOrdersById(userId);
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    @GetMapping("user/{userId}/favorites")
    List<Product> getAllFavoritesById(@PathVariable Long userId) {
        System.out.println("get all favorites products for current user: " + userId);
        try {
            return userServiceImp.getFavoritesById(userId);
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id) {
        System.out.println("For delete current user, the id is: " + id);
        try {
            return userServiceImp.deleteUserById(id);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
}
