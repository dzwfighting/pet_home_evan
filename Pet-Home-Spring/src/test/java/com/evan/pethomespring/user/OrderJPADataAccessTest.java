package com.evan.pethomespring.user;

import com.evan.pethomespring.exception.OrderNotFoundException;
import com.evan.pethomespring.model.Order;
import com.evan.pethomespring.model.User;
import com.evan.pethomespring.repository.OrderRepository;
import com.evan.pethomespring.service.OrderService;
import com.evan.pethomespring.service.OrderServiceImp;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class OrderJPADataAccessTest {
    @Mock
    OrderRepository orderRepository;

    @InjectMocks
    OrderService orderService = new OrderServiceImp();

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveOrderTest() {
        Order order = new Order();
        order.setOrderId(1L);

        when(orderRepository.save(any())).thenReturn(order);

        Order acturalOrder = orderService.saveOrder(order);

        verify(orderRepository, times(1)).save(any());

        assertEquals(order, acturalOrder);
    }

    @Test
    void getAllOrdersTest() {
        Order order = new Order();
        order.setOrderId(1L);
        List<Order> expectedOrders = new ArrayList<>();
        expectedOrders.add(order);

        when(orderRepository.findAll()).thenReturn(expectedOrders);

        List<Order> acturalOrders = orderService.getAllOrders();

        verify(orderRepository, times(1)).findAll();
        assertEquals(expectedOrders, acturalOrders);
    }

    @Test
    void getOrderByIdTest() throws OrderNotFoundException {
        Order order = new Order();
        order.setOrderId(1L);

        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        Order acturalOrder = orderService.getOrderById(1L);

        verify(orderRepository, times(1)).findById(1L);
        assertEquals(order, acturalOrder);
    }

    @Test
    void updateOrderByIdTest() throws OrderNotFoundException {
        Order order = new Order();
        order.setOrderId(1L);
        User user = new User();
        order.setUserId(user.getUserId());

        Order newOrder = new Order();
        newOrder.setOrderId(1L);

        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any())).thenReturn(newOrder);

        Order acturalOrder = orderService.updateOrderById(1L, newOrder);
        verify(orderRepository, times(1)).findById(1L);
        verify(orderRepository, times(1)).save(any());

        assertEquals(newOrder, acturalOrder);

    }

    @Test
    void deleteOrderByIdTest() throws OrderNotFoundException {
        Order order = new Order();
        order.setOrderId(1L);

        when(orderRepository.save(order)).thenReturn(order);
        when(orderRepository.existsById(1L)).thenReturn(true);

        String acturalRes = orderService.deleteOrderById(1L);
        verify(orderRepository, times(1)).existsById(1L);
        assertEquals(acturalRes, "Order with id: " + 1L + " has been deleted successfully!");

    }
}
