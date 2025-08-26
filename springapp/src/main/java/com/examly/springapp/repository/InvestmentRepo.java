package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Investment;

@Repository
public interface InvestmentRepo extends JpaRepository<Investment, Long> {
    List<Investment> findByStatus(String status);

    List<Investment> findByType(String type);

    boolean existsByName(String name);

    List<Investment> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrTypeContainingIgnoreCase(
            String name, String description,String type);

}
