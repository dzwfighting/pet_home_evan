package com.evan.pethomespring.model;

import lombok.*;
import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id"})
})
public class User {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(name = "username", nullable = false)
    private String username;
    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "avatar")
    private String avatar;


    @OneToMany(mappedBy = "user")
    List<Review> reviews;
    @OneToMany(mappedBy = "user")
    List<Order> orders;

    @ElementCollection
    List<Long> collection;
    @ElementCollection
    List<Long> cart;

    public User(String username, String email, String password, String avatar, List<Review> reviews, List<Order> orders, List<Long> collection, List<Long> cart) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.reviews = reviews;
        this.orders = orders;
        this.collection = collection;
        this.cart = cart;
    }
}
