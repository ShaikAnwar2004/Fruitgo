package com.fruitgo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fruitgo.repository.FruitRepository;
import com.fruitgo.repository.OrderRepository;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private FruitRepository fruitRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public Map<String, Object> getStats() {

        Map<String, Object> stats =
                new HashMap<>();

        stats.put(
                "totalFruits",
                fruitRepository.count()
        );

        stats.put(
                "totalOrders",
                orderRepository.count()
        );

        double revenue =
                orderRepository.findAll()
                        .stream()
                        .mapToDouble(
                                order ->
                                        order.getTotalAmount() == null
                                                ? 0
                                                : order.getTotalAmount()
                        )
                        .sum();

        stats.put(
                "totalRevenue",
                revenue
        );

        return stats;
    }
}
