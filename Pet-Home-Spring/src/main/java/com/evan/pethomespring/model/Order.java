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

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderProd> OrderProds;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<OrderProd> getOrderProds() {
        return OrderProds;
    }

    public void setOrderProds(List<OrderProd> orderProds) {
        OrderProds = orderProds;
    }
}
