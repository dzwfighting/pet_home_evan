package com.evan.pethomespring.service;

import com.evan.pethomespring.exception.ProductNotFoundException;
import com.evan.pethomespring.model.Product;
import com.evan.pethomespring.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImp implements ProductService{
    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product) { return productRepository.save(product); }
    public List<Product> findAllProducts() { return productRepository.findAll();}
    public Product findProductById(Long productId) { return productRepository.getReferenceById(productId); }

    @Override
    public List<Product> getProductByCategory(String category) {
        return productRepository.getProductByCategory(category);
    }

    public Product updateProductById(Long productId, Product newProduct) throws Exception{
        Product exitProduct = productRepository.findById(productId).orElse(null);
        if(exitProduct != null) {
            exitProduct.setAvatar(newProduct.getAvatar());
            exitProduct.setName(newProduct.getName());
            exitProduct.setCategory(newProduct.getCategory());
            exitProduct.setPrice(newProduct.getPrice());
            exitProduct.setIntroduce(newProduct.getIntroduce());
            exitProduct.setReviews(newProduct.getReviews());

            return productRepository.save(exitProduct);
        } else {
            throw new ProductNotFoundException(productId);
        }
    }

    public String deleteProductById(Long productId) throws ProductNotFoundException {
        if(!productRepository.existsById(productId)) {
            throw new ProductNotFoundException(productId);
        }

        productRepository.deleteById(productId);

        return "Product with id: " + productId + " has been deleted successfully!";
    }
}
