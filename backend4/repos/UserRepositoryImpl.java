package org.example.backend4.repos;

import org.example.backend4.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepositoryImpl extends JpaRepository<User, Integer> {
    User getUserByEmail(String email);
    User getUserById(int id);
}
