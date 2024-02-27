package com.evan.pethomespring.controller;

import com.evan.pethomespring.exception.ProductNotFoundException;
import com.evan.pethomespring.model.Product;
import com.evan.pethomespring.service.ProductServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    ProductServiceImp productServiceImp;

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

    @GetMapping("/products/{id}")
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
