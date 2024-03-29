package com.evan.pethomespring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@EqualsAndHashCode
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"email"})
})
public class User implements UserDetails {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    private Roles role;

    @Column(name = "avatar")
    private String avatar;


//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Review> reviews;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Order> orders;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "favorites",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> favorites;

    @OneToMany(cascade = CascadeType.ALL)
    private List<CartProd> cartProds;

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword(){return this.password;}

    @Override
    public String getUsername() {return email;}

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    public boolean isAccountNonLocked() {
        return true;
    }
    public boolean isCredentialsNonExpired() {
        return true;
    }
    public boolean isEnabled() {
        return true;
    }

    public User(String name, String email, String password, Roles role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(Long userId, String name, String email, String password, Roles role) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(Long userId, String name, String email, String password, Roles role, List<Order> orders, List<Product> favorites, List<CartProd> cartProds) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.orders = orders;
        this.favorites = favorites;
        this.cartProds = cartProds;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", avatar='" + avatar + '\'' +
                ", orders=" + orders +
                ", favorites=" + favorites +
                ", cartProds=" + cartProds +
                '}';
    }
}
