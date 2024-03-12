package com.evan.pethomespring.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Table(name = "cart_prod", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"cart_id"})
})
public class CartProd {
    @Id
    @Column(name = "cart_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @Column(name = "quantity")
    private int quantity;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    @JsonIgnore
//    private User user;
    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "product_id")
    private Product product;

    public CartProd(int quantity, long userId, Product product) {
        this.quantity = quantity;
        this.userId = userId;
        this.product = product;
    }

    @Override
    public String toString() {
        return "CartProd{" +
                "cartId=" + cartId +
                ", quantity=" + quantity +
                ", product=" + product +
                '}';
    }
}


