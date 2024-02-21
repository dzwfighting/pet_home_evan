package com.evan.pethomespring.service;

import com.evan.pethomespring.exception.OrderNotFoundException;
import com.evan.pethomespring.exception.ProductNotFoundException;
import com.evan.pethomespring.exception.UserNotFoundException;
import com.evan.pethomespring.model.*;

import java.util.List;

public interface UserService {
    public User saveUser(User user);
    public List<User> findAllUsers();
    public User findUserById(Long userId);
    public User updateUserById(Long userId, User newUser) throws UserNotFoundException;
    public User getUserByEmail(String email);
    public List<User> getUserByName(String name);
    public String deleteUserById(Long userId) throws UserNotFoundException;
    public List<Order> getOrdersById(Long userId) throws UserNotFoundException;
    public List<Order> getOrdersByEmail(String email) throws UserNotFoundException;
    public Order getOrderById(Long userId, Long OrderId) throws UserNotFoundException, OrderNotFoundException;
    public List<Product> getFavoritesById(Long userId) throws UserNotFoundException;
    public List<Product> getFavoritesByEmail(String email) throws UserNotFoundException;
    public List<CartProd> getCartProdsById(Long userId) throws UserNotFoundException;
    public List<CartProd> getCartProdsByEmail(String email) throws UserNotFoundException;
    public User addFavoriteProd(Long userId, Long productId) throws UserNotFoundException, ProductNotFoundException;
    public User deleteFavoriteProd(Long userId, Long productId) throws UserNotFoundException, ProductNotFoundException;
    public User addOrder(Long userId, Order order) throws UserNotFoundException;
    public User deleteOrder(Long userId, Order order) throws UserNotFoundException, OrderNotFoundException;
    public User addCartProduct(Long userId, CartProd cartProd) throws UserNotFoundException;
    public User deleteCartProduct(Long userId, CartProd cartProd) throws UserNotFoundException;

}
