package com.evan.pethomespring.controller;

import com.evan.pethomespring.exception.ProductNotFoundException;
import com.evan.pethomespring.model.CartProd;
import com.evan.pethomespring.model.Product;
import com.evan.pethomespring.model.User;
import com.evan.pethomespring.service.ProductServiceImp;
import com.evan.pethomespring.service.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ProductController {
    @Autowired
    ProductServiceImp productServiceImp;
    @Autowired
    UserServiceImp userServiceImp;

    @PostMapping("/product/add")
    Product newProduct(@RequestBody Product newProduct) {
        System.out.println("add product: " + newProduct.getProductId() + " product name: " + newProduct.getName());
        return productServiceImp.saveProduct(newProduct);
    }

    @GetMapping("/products")
    List<Product> getAllProducts() {
        System.out.println("get all products");
        return productServiceImp.findAllProducts();
    }

    @GetMapping("/product/{id}")
    Product getProductById(@PathVariable Long id) throws ProductNotFoundException {
        System.out.println("get product by id: " + id);
        return productServiceImp.findProductById(id);
    }

//    @GetMapping("/products/{id}/category")
//    List<Product> getProductByCategory(@RequestBody Product product) {
//        System.out.println("get product by category");
//        return productServiceImp.getProductByCategory(product.getCategory());
//    }

    @PutMapping("/product/{id}")
    Product updateProduct(@PathVariable Long id, @RequestBody Product newProduct) {
        System.out.println("For update the data of current product");
        System.out.println(newProduct);
        try {
            return productServiceImp.updateProductById(id, newProduct);
        }catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    @PutMapping("/product/{userid}/opecart/{operation}")
    User ProductOperateCart(@PathVariable Long userid, @RequestBody Product product, @PathVariable int operation) {
//        新写，需测试
        System.out.println("to add cartProd in user: " + userid + " the product id: " + product.getProductId());
        try {
            User user = userServiceImp.findUserById(userid);
            List<CartProd> cartProds = user.getCartProds();
            System.out.println("before remove this prod: " + cartProds.size());
            CartProd oldCartProd = cartProds.stream()
                    .filter(cartProd -> cartProd.getProduct().getProductId().equals(product.getProductId()))
                    .findFirst()
                    .orElse(null);

            if (oldCartProd != null) {
                cartProds.remove(oldCartProd);
                System.out.println("We find this user already add this product, we will remove: " + oldCartProd.getProduct().getProductId() + " product name: " + oldCartProd.getProduct().getName());
            }
            System.out.println("if product already in, After remove this prod: " + cartProds.size());
            CartProd newCartProd;
            List<CartProd> newCartProds = new ArrayList<>(cartProds);
            if (oldCartProd == null) {
                if (operation > 0) {
                    newCartProd = new CartProd(1, userid, product);
                    newCartProds.add(newCartProd);
                    user.setCartProds(newCartProds);
                } else {
                    System.out.println("you cannot delete not exist product");
                }
            } else {
                System.out.println("we can find this cartProd, quantity is: " + oldCartProd.getQuantity());
                oldCartProd.setQuantity(oldCartProd.getQuantity() + operation);
                System.out.println("after operate, the current quantity: " + oldCartProd.getQuantity());
                System.out.println("after operate, newCartProds size is: " + newCartProds.size());
                if (oldCartProd.getQuantity() > 0) newCartProds.add(oldCartProd);
                user.setCartProds(newCartProds);
                System.out.println("after add/delete product from cart, the size of cart: " + user.getCartProds().size());
            }

            User res =  userServiceImp.updateUserById(user.getUserId(), user);
            User test = userServiceImp.findUserById(userid);
            System.out.println("test: " + test.getCartProds().size());
            return res;
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    @PutMapping("/product/{userid}/opefavorite/{operation}")
    User ProductOperateFavorite(@PathVariable Long userid, @RequestBody Product product, @PathVariable int operation) {
        System.out.println("I will add or cancel current user's favorite, the user id is: " + userid + " product data is: " + product + " the operation is: " + operation);
        try {
            User user = userServiceImp.findUserById(userid);
            List<Product> favorites = user.getFavorites();
            if (operation == 1) {
                favorites.add(product);
            } else {
                favorites.removeIf(prod -> prod.getProductId().equals(product.getProductId()));
            }
            user.setFavorites(favorites);
            return userServiceImp.updateUserById(userid, user);
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    @DeleteMapping("/product/{id}")
    String deleteProduct(@PathVariable Long id) {
        System.out.println("For delete product, the id is: " + id);
        try {
            return productServiceImp.deleteProductById(id);
        }catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
}
