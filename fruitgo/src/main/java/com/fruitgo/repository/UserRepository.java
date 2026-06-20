package com.fruitgo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitgo.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}
