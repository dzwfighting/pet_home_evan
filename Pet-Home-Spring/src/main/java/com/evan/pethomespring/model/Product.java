package com.evan.pethomespring.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "products", uniqueConstraints = @UniqueConstraint(columnNames = "product_id"))
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(name = "image")
    private String image;
    @Column(name = "name")
    private String name;
    @Column(name = "category")
    private String category;
    @Column(name = "price")
    private Long price;
    @Column(name = "introduce")
    private String introduce;

//    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
//    private Set<CartProd> cartProds = new HashSet<>();
//    @ManyToMany(mappedBy = "favorites", cascade = CascadeType.ALL)
//    private Set<User> favoritedByUsers = new HashSet<>();
}
