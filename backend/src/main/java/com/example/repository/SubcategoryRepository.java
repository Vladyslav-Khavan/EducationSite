package com.example.repository;

import com.example.model.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubcategoryRepository extends JpaRepository<Subcategory, Integer> {
    Subcategory findById(Long subcategoryId);
}
