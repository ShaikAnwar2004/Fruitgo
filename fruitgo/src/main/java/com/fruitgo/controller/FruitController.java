package com.fruitgo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fruitgo.entity.Fruit;
import com.fruitgo.service.FruitService;

@RestController
@RequestMapping("/api/fruits")
@CrossOrigin(origins = "http://localhost:5173")
public class FruitController {

    @Autowired
    private FruitService fruitService;

    @PostMapping
    public Fruit addFruit(@RequestBody Fruit fruit) {
        return fruitService.addFruit(fruit);
    }
    

    @GetMapping
    public List<Fruit> getAllFruits() {
        return fruitService.getAllFruits();
    }

    @GetMapping("/{id}")
    public Fruit getFruitById(@PathVariable Long id) {
        return fruitService.getFruitById(id);
    }

    @PutMapping("/{id}")
    public Fruit updateFruit(
            @PathVariable Long id,
            @RequestBody Fruit fruit) {

        return fruitService.updateFruit(id, fruit);
    }

    @DeleteMapping("/{id}")
    public String deleteFruit(@PathVariable Long id) {
        return fruitService.deleteFruit(id);
    }

    @PutMapping("/stock/{id}/{quantity}")
public Fruit reduceStock(
        @PathVariable Long id,
        @PathVariable Integer quantity
) {

    Fruit fruit =
            fruitService.getFruitById(id);

    fruit.setQuantity(
            fruit.getQuantity() - quantity
    );

    return fruitService.addFruit(fruit);
}

    
}
