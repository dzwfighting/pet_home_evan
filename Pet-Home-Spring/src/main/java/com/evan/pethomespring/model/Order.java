package com.evan.pethomespring.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders", uniqueConstraints = {@UniqueConstraint(columnNames = {"order_id"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @Column(name = "order_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ElementCollection
        @CollectionTable(name = "orders")
        @Column(name = "order_products")
    List<Long> orderProducts;

    @Column(name = "total_amount")
    private Long totalAmount;
    @Column(name = "purchase_date")
    private String purchaseDate;

    public Order(User user, List<Long> orderProducts, Long totalAmount, String purchaseDate) {
        this.user = user;
        this.orderProducts = orderProducts;
        this.totalAmount = totalAmount;
        this.purchaseDate = purchaseDate;
    }
}
