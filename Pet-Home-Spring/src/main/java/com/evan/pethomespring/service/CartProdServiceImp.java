package com.evan.pethomespring.service;

import com.evan.pethomespring.model.CartProd;
import com.evan.pethomespring.model.Product;
import com.evan.pethomespring.model.User;
import com.evan.pethomespring.repository.CartProdRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CartProdServiceImp implements CartProdService{
    @Autowired
    CartProdRepository cartProdRepository;

    @Override
    public List<CartProd> getAllCartProds() {
        return cartProdRepository.findAll();
    }

    @Override
    public CartProd getCartProdsById(Long cartId) {
        return cartProdRepository.findById(cartId).orElse(null);
    }

    @Override
    public CartProd addToCart(User user, Product product, int quantity) {
        CartProd cartProd = new CartProd();
        cartProd.setProduct(product);
        cartProd.setQuantity(quantity);
        cartProd.setUser(user);
        return cartProdRepository.save(cartProd);
    }

    @Override
    public void removeProdFromCart(Long cartProdId) {
        cartProdRepository.deleteById(cartProdId);
    }

    @Override
    public void updateCartQuantity(Long cartProdId, int quantity) {
        cartProdRepository.updateCartQuantity(cartProdId, quantity);
    }
}
