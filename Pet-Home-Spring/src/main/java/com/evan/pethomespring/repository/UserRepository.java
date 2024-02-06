package com.evan.pethomespring.repository;

import com.evan.pethomespring.exception.UserNotFoundException;
import com.evan.pethomespring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    @Query("SELECT u FROM User u WHERE u.email = :email")
    User getUserByEmail(String email) throws UserNotFoundException;

    @Query(value = "SELECT u FROM User u WHERE u.username = :username")
    List<User> getUserByName(String username);
}
