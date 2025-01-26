package org.example.backend4.repos;

import jakarta.transaction.Transactional;
import org.example.backend4.models.Sport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface SportRepositoryImpl extends JpaRepository<Sport, Integer> {
    Sport findById(int id);

    @Modifying
    @Transactional
    @Query("update Sport s set s.name = :name, s.description = :description where s.id = :id")
    void editSport(int id, String name, String description);
}
