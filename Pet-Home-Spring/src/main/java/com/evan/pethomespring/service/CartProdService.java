package com.evan.pethomespring.service;

import com.evan.pethomespring.model.CartProd;
import com.evan.pethomespring.model.Product;
import com.evan.pethomespring.model.User;

import java.util.List;

public interface CartProdService {
    public List<CartProd> getAllCartProds();
    public CartProd getCartProdsById(Long cartId);
    public CartProd addToCart(User user, Product product, int quantity);
    public void removeProdFromCart(Long cartProdId);
    public void updateCartQuantity(Long cartProdId, int quantity);
}
