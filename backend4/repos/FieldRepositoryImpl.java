package org.example.backend4.repos;

import jakarta.transaction.Transactional;
import org.example.backend4.models.Field;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FieldRepositoryImpl extends JpaRepository<Field, Integer> {

    @Query("select f from Field f where f.sportId = :sportId order by f.id")
    List<Field> findBySportId(int sportId);

    @Query("select f from Field f order by f.id asc")
    List<Field> getAll();

    @Modifying
    @Transactional
    @Query("update Field f set f.name = :name, f.sportId = :sportId, f.length = :length, f.width = :width, f.hourPrice = :hourPrice where f.id = :id")
    void editField(int id, String name, int sportId, int length, int width, double hourPrice);

    @Modifying
    @Transactional
    @Query("update Field f set f.usageCountSinceMaintenance = f.usageCountSinceMaintenance+1 where f.id = :id")
    void updateFieldUsageCountSinceMaintenance(int id);

    @Modifying
    @Transactional
    @Query("update Field f set f.usageCountSinceMaintenance = 0 where f.id = :id")
    void setFieldUsageCountSinceMaintenance(int id);
}
