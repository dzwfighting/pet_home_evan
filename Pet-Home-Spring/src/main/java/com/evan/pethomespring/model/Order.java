package com.evan.pethomespring.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders", uniqueConstraints = {@UniqueConstraint(columnNames = {"order_id"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Order {
    @Id
    @Column(name = "order_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(name = "user_id")
    private Long userId;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderProd> OrderProds;
}
