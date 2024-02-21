package com.evan.pethomespring.service;

import com.evan.pethomespring.exception.OrderNotFoundException;
import com.evan.pethomespring.model.Order;

import java.util.List;

public interface OrderService {
    public Order saveOrder(Order order);
    public List<Order> getAllOrders();
    public Order getOrderById(Long orderId) throws OrderNotFoundException;
    public Order updateOrderById(Long orderId, Order newOrder) throws OrderNotFoundException;
    public String deleteOrderById(Long orderId) throws OrderNotFoundException;
}
