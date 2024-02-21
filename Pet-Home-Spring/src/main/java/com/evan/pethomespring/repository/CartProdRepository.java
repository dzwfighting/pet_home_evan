package com.evan.pethomespring.repository;

import com.evan.pethomespring.model.CartProd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartProdRepository extends JpaRepository<CartProd, Long> {
    @Modifying
    @Query("UPDATE CartProd c SET c.quantity = :quantity WHERE c.cartId = :cartId")
    void updateCartQuantity(@Param("cartId") Long cartId, @Param("quantity") int quantity);
}
