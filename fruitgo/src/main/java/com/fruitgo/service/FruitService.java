package com.fruitgo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fruitgo.entity.Fruit;
import com.fruitgo.repository.FruitRepository;

@Service
public class FruitService {


@Autowired
private FruitRepository fruitRepository;

public Fruit addFruit(Fruit fruit) {

    return fruitRepository.save(fruit);

}

public List<Fruit> getAllFruits() {

    return fruitRepository.findAll();

}

public Fruit getFruitById(Long id) {

    return fruitRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Fruit not found"
                    ));

}

public Fruit updateFruit(
        Long id,
        Fruit fruitDetails
) {

    Fruit fruit =
            fruitRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Fruit not found"
                    ));

    fruit.setName(
            fruitDetails.getName()
    );

    fruit.setDescription(
            fruitDetails.getDescription()
    );

    fruit.setPrice(
            fruitDetails.getPrice()
    );

    fruit.setQuantity(
            fruitDetails.getQuantity()
    );

    fruit.setCategory(
            fruitDetails.getCategory()
    );

    fruit.setImageUrl(
            fruitDetails.getImageUrl()
    );

    return fruitRepository.save(
            fruit
    );
}

public String deleteFruit(Long id) {

    Fruit fruit =
            fruitRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Fruit not found"
                    ));

    fruitRepository.delete(fruit);

    return "Fruit Deleted Successfully";
}


}

