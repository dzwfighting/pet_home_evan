package com.evan.pethomespring.user;

import com.evan.pethomespring.exception.ProductNotFoundException;
import com.evan.pethomespring.model.Product;
import com.evan.pethomespring.model.User;
import com.evan.pethomespring.repository.ProductRepository;
import com.evan.pethomespring.service.ProductService;
import com.evan.pethomespring.service.ProductServiceImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ProductJPADataAccessTest {
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService = new ProductServiceImp();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveProductTest() {
        Product product = new Product();
        product.setProductId(1L);

        when(productRepository.save(product)).thenReturn(product);

        Product acturalProd = productService.saveProduct(product);

        verify(productRepository, times(1)).save(any());
        assertEquals(product, acturalProd);
    }

    @Test
    void findAllProductsTest() throws ProductNotFoundException {
        Product product1 = new Product();
        product1.setProductId(1L);
        Product product2 = new Product();
        product2.setProductId(2L);

        List<Product> expectedProds = new ArrayList<>();
        expectedProds.add(product1);
        expectedProds.add(product2);

        when(productRepository.findAll()).thenReturn(expectedProds);
        List<Product> acturalProds = productService.findAllProducts();
        verify(productRepository, times(1)).findAll();
        assertEquals(acturalProds, expectedProds);
    }

    @Test
    void findProductByIdTest() throws ProductNotFoundException {
        Product product = new Product();
        product.setProductId(1L);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        Product acturalProd = productService.findProductById(1L);
        verify(productRepository, times(1)).findById(1L);
        assertEquals(product, acturalProd);
    }

    @Test
    void updateProductByIdTest() throws ProductNotFoundException {
        Product product = new Product();
        product.setProductId(1L);
        product.setName("pet");
        Product newProduct = new Product();
        newProduct.setProductId(1L);
        newProduct.setName("newPet");

        when(productRepository.save(any())).thenReturn(product);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productRepository.save(any())).thenReturn(newProduct);

        Product acturalProd = productService.updateProductById(1L, newProduct);

        verify(productRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).save(any());

        assertEquals(newProduct, acturalProd);

    }

    @Test
    void deleteProductByIdTest() throws ProductNotFoundException {
        Product product = new Product();
        product.setProductId(1L);

        when(productRepository.existsById(1L)).thenReturn(true);

        String acturalRes = productService.deleteProductById(1L);

        verify(productRepository, times(1)).existsById(1L);
        verify(productRepository, times(1)).deleteById(1L);

        assertEquals(acturalRes, "Product with id: " + 1L + " has been deleted successfully!");

    }
}
