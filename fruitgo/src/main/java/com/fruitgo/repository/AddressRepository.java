package com.fruitgo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitgo.entity.Address;

public interface AddressRepository
        extends JpaRepository<Address, Long> {
}
