package com.fruitgo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitgo.entity.Fruit;

public interface FruitRepository extends JpaRepository<Fruit, Long> {

}
