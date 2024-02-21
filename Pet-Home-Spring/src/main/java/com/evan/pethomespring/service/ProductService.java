package com.evan.pethomespring.service;

import com.evan.pethomespring.exception.ProductNotFoundException;
import com.evan.pethomespring.model.CartProd;
import com.evan.pethomespring.model.Product;

import java.util.List;

public interface ProductService {
    public Product saveProduct(Product product);
    public List<Product> findAllProducts() throws ProductNotFoundException;
    public Product findProductById(Long productId) throws ProductNotFoundException;
//    public List<Product> getProductByCategory(String category);
    public Product updateProductById(Long productId, Product newProduct) throws ProductNotFoundException;
    public String deleteProductById(Long productId) throws ProductNotFoundException;

}
