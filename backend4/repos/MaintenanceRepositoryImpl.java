package org.example.backend4.repos;

import org.example.backend4.models.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceRepositoryImpl extends JpaRepository<Maintenance, Integer> {

}
