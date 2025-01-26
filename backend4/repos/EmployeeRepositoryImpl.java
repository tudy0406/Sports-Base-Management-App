package org.example.backend4.repos;

import org.example.backend4.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface EmployeeRepositoryImpl extends JpaRepository<Employee, Integer> {

    @Query("select e from Employee e where e.email = :email")
    Employee getEmployeeByEmail(@Param("email") String email);
}

