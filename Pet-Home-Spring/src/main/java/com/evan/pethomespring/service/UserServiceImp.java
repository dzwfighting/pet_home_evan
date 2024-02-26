package com.evan.pethomespring.service;

import com.evan.pethomespring.exception.OrderNotFoundException;
import com.evan.pethomespring.exception.ProductNotFoundException;
import com.evan.pethomespring.exception.UserNotFoundException;
import com.evan.pethomespring.model.*;
import com.evan.pethomespring.repository.OrderRepository;
import com.evan.pethomespring.repository.ProductRepository;
import com.evan.pethomespring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;

//    public UserServiceImp() {}
    public UserServiceImp(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    public User saveUser(User user) {
        System.out.println("save user information " + "password: " + user.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        User saveUser = new User(
//                user.getUsername(),
//                user.getEmail(),
//                passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return user;
    }

    public List<User> findAllUsers() { return userRepository.findAll(); }

    public User findUserById(Long userId) { return userRepository.getReferenceById(userId); }


    public User updateUserById(Long userId, User newUser) throws UserNotFoundException {
        User existUser = userRepository.findById(userId).orElse(null);
        if (existUser != null) {
            existUser.setName(newUser.getName());
            existUser.setEmail(newUser.getEmail());
            existUser.setPassword(newUser.getPassword());
            existUser.setRole(newUser.getRole());
            existUser.setAvatar(newUser.getAvatar());
            existUser.setCartProds(newUser.getCartProds());
            existUser.setOrders(newUser.getOrders());
            existUser.setFavorites(newUser.getFavorites());

            return userRepository.save(existUser);
        } else {
            throw new UserNotFoundException(userId);
        }
    }


    public User getUserByEmail(String email) {
            return userRepository.findByEmail(email);
    }

    public List<User> getUserByName(String name) {
        System.out.println("in userServiceImp, get user by username: " + name);
//        return userRepository.getUserByName(username);
        return userRepository.findByName(name);
    }


    public String deleteUserById(Long userId) throws UserNotFoundException{
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException(userId);
        }
       userRepository.deleteById(userId);
       return "User with id: " + userId + " has been deleted successfully!";
    }

    @Override
    public List<Order> getOrdersById(Long userId) throws UserNotFoundException {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) throw new UserNotFoundException(userId);
        return user.getOrders();
    }

    @Override
    public List<Order> getOrdersByEmail(String email) throws UserNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) throw new UserNotFoundException(email);
        System.out.println("can find the user: " + user.getEmail());
        return user.getOrders();
    }

    @Override
    public Order getOrderById(Long userId, Long orderId) throws UserNotFoundException, OrderNotFoundException {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) throw new UserNotFoundException(userId);
        Order order = user.getOrders().stream()
                .filter(o -> o.getOrderId().equals(orderId))
                .findFirst()
                .orElse(null);
        if (order == null) throw new OrderNotFoundException(orderId);
        return order;
    }

    @Override
    public List<Product> getFavoritesById(Long userId) throws UserNotFoundException {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) throw new UserNotFoundException(userId);
        return user.getFavorites();
    }

    @Override
    public List<Product> getFavoritesByEmail(String email) throws UserNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) throw new UserNotFoundException(email);
        return user.getFavorites();
    }

    @Override
    public List<CartProd> getCartProdsById(Long userId) throws UserNotFoundException {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) throw new UserNotFoundException(userId);
        return user.getCartProds();
    }

    @Override
    public List<CartProd> getCartProdsByEmail(String email) throws UserNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) throw new UserNotFoundException(email);
        return user.getCartProds();
    }

    @Override
    public User addFavoriteProd(Long userId, Long productId) throws UserNotFoundException, ProductNotFoundException {
        User user = userRepository.findById(userId).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);
        if (user == null) throw new UserNotFoundException(userId);
        if (product == null) throw new ProductNotFoundException(productId);
        user.getFavorites().add(product);
        userRepository.save(user);
        return user;
    }

    @Override
    public User deleteFavoriteProd(Long userId, Long productId) throws UserNotFoundException, ProductNotFoundException {
        User user = userRepository.findById(userId).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);
        if (user == null) throw new UserNotFoundException(userId);
        if (product == null) throw new ProductNotFoundException(productId);
        user.getFavorites().remove(product);
        return userRepository.save(user);
    }

    @Override
    public User addOrder(Long userId, Order order) throws UserNotFoundException {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) throw new UserNotFoundException(userId);
        user.getOrders().add(order);
        userRepository.save(user);
        return user;
    }

    @Override
    public User deleteOrder(Long userId, Order order) throws UserNotFoundException, OrderNotFoundException {
        User user = userRepository.findById(userId).orElse(null);
        Order exitOrder = orderRepository.findById(order.getOrderId()).orElse(null);
        if (user == null) throw new UserNotFoundException(userId);
        if (exitOrder == null) throw new OrderNotFoundException(order.getOrderId());
        user.getOrders().remove(exitOrder);
        return userRepository.save(user);
    }

    @Override
    public User addCartProduct(Long userId, CartProd cartProd) throws UserNotFoundException {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) throw new UserNotFoundException(userId);
        user.getCartProds().add(cartProd);
        userRepository.save(user);
        return user;
    }

    @Override
    public User deleteCartProduct(Long userId, CartProd cartProd) throws UserNotFoundException {
        User user = userRepository.findById(userId).orElse(null);
        Product exitProd = productRepository.findById(cartProd.getCartId()).orElse(null);
        if (user == null) throw new UserNotFoundException(userId);
        if (exitProd != null) user.getCartProds().remove(cartProd);
        return userRepository.save(user);
    }
}
