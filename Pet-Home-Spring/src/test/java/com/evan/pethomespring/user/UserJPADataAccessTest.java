package com.evan.pethomespring.user;

import com.evan.pethomespring.TestConfig;
import com.evan.pethomespring.exception.OrderNotFoundException;
import com.evan.pethomespring.exception.ProductNotFoundException;
import com.evan.pethomespring.exception.UserNotFoundException;
import com.evan.pethomespring.model.*;
import com.evan.pethomespring.repository.OrderRepository;
import com.evan.pethomespring.repository.ProductRepository;
import com.evan.pethomespring.repository.UserRepository;
import com.evan.pethomespring.service.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
//@Import({TestConfig.class})
public class UserJPADataAccessTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private ProductRepository productRepository;
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImp userService;
    @InjectMocks
    private ProductServiceImp productService;
    @InjectMocks
    private OrderServiceImp orderService;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
//        MockitoAnnotations.initMocks(this);
    }

    @Test
    void saveUserValidTest() {
        User user = new User(1L, "user1", "user1@gmail.com", "password", Roles.USER);

        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(userRepository.save(user)).thenReturn(user);
        userService.saveUser(user);

        verify(userRepository, times(1)).save(any());
    }

    @Test
    void findAllUsersTest() {
        List<User> users = Collections.singletonList(new User());
        when(userRepository.findAll()).thenReturn(users);
        List<User> expected = userService.findAllUsers();
//        System.out.println(expected.size() + "  " + users.size() + " data: " + expected.get(0).getUsername() + " user " + users.get(0).getUsername());
        verify(userRepository, times(1)).findAll();
        assertEquals(expected, users);
    }

    @Test
    void findUserByIdValidTest() {
        User user = new User(1L, "user1", "user1@gmail.com", "password", Roles.USER);

        when(userRepository.getReferenceById(1L)).thenReturn(user);
        User res = userService.findUserById(1L);

        verify(userRepository, times(1)).getReferenceById(1L);
        assertEquals(user, res);
    }

    @Test
    void updateUserByIdTest() throws UserNotFoundException {
        User user = new User(1L, "user1", "user1@gmail.com", "password", Roles.USER);
        User newUser = new User(1L, "user1", "user1-1@gmail.com", "password", Roles.USER);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any())).thenReturn(newUser);

        User updated = userService.updateUserById(1L, newUser);

        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any());

        assertEquals(newUser.getUserId(), updated.getUserId());
        assertEquals(newUser.getUsername(), updated.getUsername());
        assertEquals(newUser.getEmail(), updated.getEmail());
    }

    @Test
    void getUserByEmailTest() {
        User user = new User(1L, "user1", "user1@gmail.com", "password", Roles.USER);
        when(userRepository.findByEmail(user.getEmail())).thenReturn(user);

        User getUser = userService.getUserByEmail(user.getEmail());
//        System.out.println(getUser.getUsername());

        verify(userRepository, times(1)).findByEmail(user.getEmail());
        assertEquals(user, getUser);
    }

//    @Test
//    void GetUsersByNameTest() {
//        User user1 = new User(1L, "user1", "user1@gmail.com", "password", Roles.USER);
//        User user2 = new User(2L, "user1", "user1-1@gmail.com", "password", Roles.USER);
//
//        when(userRepository.findByName(user1.getName())).thenReturn(Arrays.asList(user1, user2));
//
//        List<User> expected = userService.getUserByName(user1.getUsername());
//        verify(userRepository, times(1)).findByName(user1.getName());
//        assertEquals(expected, Arrays.asList(user1, user2));
//    }

    @Test
    void deleteUserByIdValidTest() throws UserNotFoundException {
        User user = new User();
        user.setUserId(1L);

        when(userRepository.existsById(user.getUserId())).thenReturn(true);

        String res = userService.deleteUserById(user.getUserId());

        verify(userRepository, times(1)).existsById(user.getUserId());
        verify(userRepository, times(1)).deleteById(user.getUserId());
        assertEquals("User with id: " + 1L + " has been deleted successfully!", res);
    }

    @Test
    void deleteUserByIdInvalidTest() {
        Long userId = 1L;
        when(userRepository.existsById(userId)).thenReturn(false);
        assertThrows(UserNotFoundException.class, () -> userService.deleteUserById(userId));
        verify(userRepository, times(1)).existsById(userId);
        verify(userRepository, never()).deleteById(any());
    }

    @Test
    void getOrdersByIdValidTest() throws UserNotFoundException {
        Long userId = 1L;
        User user = new User();
        user.setUserId(userId);
        List<Order> expectedOrders = new ArrayList<>();
        Order order1 = new Order();
        Order order2 = new Order();
        expectedOrders.add(order1);
        expectedOrders.add(order2);

        user.setOrders(expectedOrders);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        List<Order> acturalOrders = userService.getOrdersById(userId);

        verify(userRepository, times(1)).findById(userId);
        assertEquals(expectedOrders, acturalOrders);
    }

    @Test
    void getOrdersByIdInvalidTest() {
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.getOrdersById(userId));
    }

    @Test
    void getOrdersByEmailValidTest() throws UserNotFoundException {
        String email = "user1@gmail.com";
        User user = new User();
        user.setEmail(email);
        List<Order> expectedOrders = new ArrayList<>();
        Order order1 = new Order();
        Order order2 = new Order();
        expectedOrders.add(order1);
        expectedOrders.add(order2);
        user.setOrders(expectedOrders);

        when(userRepository.findByEmail(email)).thenReturn(user);
        List<Order> acturalOrders = userService.getOrdersByEmail(email);
        verify(userRepository, times(1)).findByEmail(email);

        assertEquals(expectedOrders.size(), acturalOrders.size());
    }

    @Test
    void getOrdersByEmailInvalidTest() {
        String email = "user1@gmail.com";
        when(userRepository.findByEmail(email)).thenReturn(null);
        assertThrows(UserNotFoundException.class, () -> userService.getOrdersByEmail(email));
    }

    @Test
    void getOrderByIdTest() throws UserNotFoundException, OrderNotFoundException {
        Long userId = 1L;
        User user = new User();
        user.setUserId(userId);
        Long orderId = 1L;
        Order order = new Order();
        order.setOrderId(orderId);
        List<Order> orders = new ArrayList<>();
        orders.add(order);
        user.setOrders(orders);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        Order acturalOrder = userService.getOrderById(userId, orderId);

        verify(userRepository, times(1)).findById(userId);

        assertEquals(order, acturalOrder);
    }

    @Test
    void getFavoritesByIdTest() throws UserNotFoundException {
        Long userId = 1L;
        User user = new User();
        user.setUserId(userId);
        Long productId = 1L;
        Product product = new Product();
        product.setProductId(productId);
        List<Product> expectedFavorites = new ArrayList<>();
        expectedFavorites.add(product);
        user.setFavorites(expectedFavorites);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        List<Product> acturalFavorites = userService.getFavoritesById(userId);
        verify(userRepository, times(1)).findById(userId);

        assertEquals(expectedFavorites, acturalFavorites);
    }

    @Test
    void getFavoritesByEmailTest() throws UserNotFoundException {
        String email = "user@gmail.com";
        User user = new User();
        user.setEmail(email);
        Long productId = 1L;
        Product product = new Product();
        product.setProductId(productId);
        List<Product> exptectedFavorites = new ArrayList<>();
        exptectedFavorites.add(product);
        user.setFavorites(exptectedFavorites);

        when(userRepository.findByEmail(email)).thenReturn(user);
        List<Product> acturalFavorites = userService.getFavoritesByEmail(email);
        verify(userRepository, times(1)).findByEmail(email);
        assertEquals(exptectedFavorites, acturalFavorites);
    }

    @Test
    void getCartProdsByIdTest() throws UserNotFoundException {
        Long userId = 1L;
        User user = new User();
        user.setUserId(userId);
        Long cartId = 1L;
        CartProd cartProd = new CartProd();
        cartProd.setCartId(cartId);
        List<CartProd> expectedCartProd = new ArrayList<>();
        expectedCartProd.add(cartProd);
        user.setCartProds(expectedCartProd);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        List<CartProd> acturalCartProd = userService.getCartProdsById(userId);
        verify(userRepository, times(1)).findById(userId);
        assertEquals(acturalCartProd, expectedCartProd);
    }

    @Test
    void getCartProdsByEmailTest() throws UserNotFoundException {
        String email = "user@gmail.com";
        User user = new User();
        user.setEmail(email);

        Long cartId = 1L;
        CartProd cartProd = new CartProd();
        cartProd.setCartId(cartId);
        List<CartProd> expectedCartProds = new ArrayList<>();
        expectedCartProds.add(cartProd);
        user.setCartProds(expectedCartProds);

        when(userRepository.findByEmail(email)).thenReturn(user);
        List<CartProd> acturalCartProds = userService.getCartProdsByEmail(email);
        verify(userRepository, times(1)).findByEmail(email);
        assertEquals(expectedCartProds, acturalCartProds);
    }

    @Test
    void addFavoriteProdTest() throws UserNotFoundException, ProductNotFoundException {
        User user = new User();
        user.setUserId(1L);
        User newUser = new User();
        user.setUserId(1L);

        Product product1 = new Product();
        product1.setProductId(1L);
        List<Product> oldCartProduct = new ArrayList<>();
        oldCartProduct.add(product1);
        user.setFavorites(oldCartProduct);

        Product product2 = new Product();
        product2.setProductId(2L);
        List<Product> newCartProd = new ArrayList<>();
        newCartProd.add(product1);
        newCartProd.add(product2);
        newUser.setFavorites(newCartProd);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(productRepository.findById(2L)).thenReturn(Optional.of(product2));
        when(userRepository.save(any())).thenReturn(newUser);

        User acturalUser = userService.addFavoriteProd(1L, 2L);
        verify(userRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).findById(2L);
        verify(userRepository, times(1)).save(any());

        assertEquals(newUser.getFavorites(), acturalUser.getFavorites());
    }

    @Test
    void deleteFavoriteProdTest() throws UserNotFoundException, ProductNotFoundException {
        User user = new User();
        user.setUserId(1L);
        User newUser = new User();
        newUser.setUserId(1L);

        Product product = new Product();
        product.setProductId(1L);
        List<Product> favorites = new ArrayList<>();
        favorites.add(product);
        user.setFavorites(favorites);

        newUser.setFavorites(favorites);
        newUser.getFavorites().remove(product);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(userRepository.save(any())).thenReturn(newUser);

        User acturalUser = userService.deleteFavoriteProd(1L, 1L);

        verify(userRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any());

        assertEquals(newUser.getFavorites(), acturalUser.getFavorites());
    }

    @Test
    void addOrderTest() throws UserNotFoundException {
        User user = new User();
        user.setUserId(1L);
        User newUser = new User();
        newUser.setUserId(1L);

        Order order1 = new Order();
        order1.setOrderId(1L);
        List<Order> oldOrders = new ArrayList<>();
        oldOrders.add(order1);
        user.setOrders(oldOrders);

        Order order2 = new Order();
        order2.setOrderId(2L);
        List<Order> newOrders = new ArrayList<>();
        newOrders.add(order1);
        newOrders.add(order2);
        newUser.setOrders(newOrders);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any())).thenReturn(newUser);

        User acturalUser = userService.addOrder(1L, order2);

        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any());
        assertEquals(newUser.getOrders(), acturalUser.getOrders());
    }

    @Test
    void deleteOrderTest() throws UserNotFoundException, OrderNotFoundException {
        User user = new User();
        user.setUserId(1L);
        User newUser = new User();
        newUser.setUserId(1L);

        Order order = new Order();
        order.setOrderId(1L);
        List<Order> orders = new ArrayList<>();
        orders.add(order);
        user.setOrders(orders);

        newUser.setOrders(orders);
        newUser.getOrders().remove(order);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(userRepository.save(any())).thenReturn(newUser);

        User acturalUser = userService.deleteOrder(1L, order);
//        System.out.println(acturalUser);

        verify(userRepository, times(1)).findById(1L);
        verify(orderRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any());

        assertEquals(newUser.getOrders(), acturalUser.getOrders());

    }

    @Test
    void addCartProductTest() throws UserNotFoundException {
        User user = new User();
        user.setUserId(1L);
        User newUser = new User();
        newUser.setUserId(1L);

        CartProd cartProd1 = new CartProd();
        cartProd1.setCartId(1L);
        List<CartProd> cartProds = new ArrayList<>();
        cartProds.add(cartProd1);
        user.setCartProds(cartProds);

        CartProd cartProd2 = new CartProd();
        cartProd2.setCartId(2L);
        List<CartProd> newCartProds = new ArrayList<>();
        newCartProds.add(cartProd1);
        newCartProds.add(cartProd2);
        newUser.setCartProds(newCartProds);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any())).thenReturn(newUser);

        User acturalUser = userService.addCartProduct(1L, cartProd2);

        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any());

        assertEquals(newUser.getCartProds(), acturalUser.getCartProds());
    }

    @Test
    void deleteCartProductTest() throws UserNotFoundException {
        User user = new User();
        user.setUserId(1L);
        User newUser = new User();
        newUser.setUserId(1L);

        Product product = new Product();
        product.setProductId(1L);
        CartProd cartProd = new CartProd();
        cartProd.setCartId(1L);
        cartProd.setProduct(product);
        List<CartProd> oldCartProds = new ArrayList<>();
        oldCartProds.add(cartProd);
        user.setCartProds(oldCartProds);

        newUser.setCartProds(oldCartProds);
        newUser.getCartProds().remove(cartProd);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(userRepository.save(any())).thenReturn(newUser);

        User acturalUser = userService.deleteCartProduct(1L, cartProd);

        verify(userRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any());

        assertEquals(newUser.getCartProds(), acturalUser.getCartProds());
    }


}
