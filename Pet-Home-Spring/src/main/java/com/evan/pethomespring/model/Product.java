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
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "category", nullable = false)
    private Categories category;
    @Column(name = "price", nullable = false)
    private Long price;
    @Column(name = "introduce", nullable = false)
    private String introduce;

//    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
//    private Set<CartProd> cartProds = new HashSet<>();
//    @ManyToMany(mappedBy = "favorites", cascade = CascadeType.ALL)
//    private Set<User> favoritedByUsers = new HashSet<>();


    public Product(String name, Categories category, Long price, String introduce) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.introduce = introduce;
    }

    public Product(String image, String name, Categories category, Long price, String introduce) {
        this.image = image;
        this.name = name;
        this.category = category;
        this.price = price;
        this.introduce = introduce;
    }
}
