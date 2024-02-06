package com.evan.pethomespring.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

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

    @Column(name = "avatar")
    private String avatar;
    @Column(name = "name")
    private String name;
    @Column(name = "category")
    private String category;
    @Column(name = "price")
    private Long price;
    @Column(name = "introduce")
    private String introduce;

    @OneToMany(mappedBy = "product")
    private List<Review> reviews;

    public Product(String avatar, String name, Long price, String introduce, List<Review> reviews) {
        this.avatar = avatar;
        this.name = name;
        this.price = price;
        this.introduce = introduce;
        this.reviews = reviews;
    }
}
