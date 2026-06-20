package com.fruitgo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fruitgo.entity.Address;
import com.fruitgo.service.AddressService;

@RestController
@RequestMapping("/api/address")

public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    public Address saveAddress(
            @RequestBody Address address) {

        return addressService.saveAddress(address);
    }

    @GetMapping
    public List<Address> getAllAddresses() {

        return addressService.getAllAddresses();
    }
}
