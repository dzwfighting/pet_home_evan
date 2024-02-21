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

    @Override
    public Product saveProduct(Product product) { return productRepository.save(product); }

    @Override
    public List<Product> findAllProducts() { return productRepository.findAll();}

    @Override
    public Product findProductById(Long productId) throws ProductNotFoundException {
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) throw new ProductNotFoundException(productId);
        return product;
    }

//    @Override
//    public List<Product> getProductByCategory(String category) {
//        return productRepository.getProductByCategory(category);
//    }

    @Override
    public Product updateProductById(Long productId, Product newProduct) throws ProductNotFoundException{
        Product exitProduct = productRepository.findById(productId).orElse(null);
        if(exitProduct != null) {
            exitProduct.setImage(newProduct.getImage());
            exitProduct.setName(newProduct.getName());
            exitProduct.setCategory(newProduct.getCategory());
            exitProduct.setPrice(newProduct.getPrice());
            exitProduct.setIntroduce(newProduct.getIntroduce());
//            exitProduct.setReviews(newProduct.getReviews());

            return productRepository.save(exitProduct);
        } else {
            throw new ProductNotFoundException(productId);
        }
    }

    @Override
    public String deleteProductById(Long productId) throws ProductNotFoundException {
        if(!productRepository.existsById(productId)) {
            throw new ProductNotFoundException(productId);
        }

        productRepository.deleteById(productId);

        return "Product with id: " + productId + " has been deleted successfully!";
    }
}
