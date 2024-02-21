package com.evan.pethomespring.repository;

import com.evan.pethomespring.exception.UserNotFoundException;
import com.evan.pethomespring.model.CartProd;
import com.evan.pethomespring.model.Order;
import com.evan.pethomespring.model.OrderProd;
import com.evan.pethomespring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    User findByEmail(String email);
    List<User> findByName(String name);

//    @Query("SELECT u FROM User u WHERE u.email = :email")
//    User getUserByEmail(String email) throws UserNotFoundException;
//
//    @Query(value = "SELECT u FROM User u WHERE u.username like %:username%")
//    List<User> getUserByName(@Param("username") String username);

//    void addFavoritesProd(Long userId, Long productId);
//    void addOrder(Long UserId, Order order);
//    void addCartProduct(Long userId, CartProd cartProd);
}
