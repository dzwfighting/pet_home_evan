package com.evan.pethomespring.service;

import com.evan.pethomespring.exception.OrderNotFoundException;
import com.evan.pethomespring.model.Order;
import com.evan.pethomespring.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImp implements OrderService{
    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order order) { return orderRepository.save(order); }
    public List<Order> getAllOrders() { return orderRepository.findAll(); }
    public Order getOrderById(Long orderId) { return orderRepository.getReferenceById(orderId); }

    public Order updateOrderById(Long orderId, Order newOrder) throws Exception{
        Order exitOrder = orderRepository.findById(orderId).orElse(null);
        if (exitOrder != null) {
            exitOrder.setUser(newOrder.getUser());
            exitOrder.setOrderProducts(newOrder.getOrderProducts());
            exitOrder.setTotalAmount(newOrder.getTotalAmount());
            exitOrder.setPurchaseDate(newOrder.getPurchaseDate());

            return orderRepository.save(exitOrder);
        } else {
            throw new OrderNotFoundException(orderId);
        }
    }

    public String deleteOrderById(Long orderId) throws OrderNotFoundException {
        if (!orderRepository.existsById(orderId)) {
            throw new OrderNotFoundException(orderId);
        }

        orderRepository.deleteById(orderId);

        return "Order with id: " + orderId + " has been deleted successfully!";
    }
}
