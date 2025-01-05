package com.example.repository;

import com.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User>
{

    List<User> findByCountry(String country);

    User findByEmail(String email);



    @Modifying
    @Query(value = "TRUNCATE TABLE team_database.users", nativeQuery = true)
    void truncateUsers();
}
