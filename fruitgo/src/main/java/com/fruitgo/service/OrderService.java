package com.fruitgo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fruitgo.entity.Order;
import com.fruitgo.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    public Order placeOrder(Order order) {

        order.setOrderDate(
                LocalDateTime.now()
        );

        order.setStatus(
                "PLACED"
        );

        return repository.save(order);
    }

    public List<Order> getAllOrders() {
        return repository.findAll();
    }

    public Order updateStatus(
            Long id,
            String status
    ) {

        Order order = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order Not Found"));

        order.setStatus(status);

        return repository.save(order);
    }
}
