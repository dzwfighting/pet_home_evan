package com.evan.pethomespring.repository;

import com.evan.pethomespring.model.OrderProd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderProdRepository extends JpaRepository<OrderProd, Long> {
}
