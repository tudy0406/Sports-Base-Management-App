package org.example.backend4.repos;

import jakarta.transaction.Transactional;
import org.example.backend4.models.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;

@Repository
public interface CustomerRepositoryImpl extends JpaRepository<Customer, Integer> {

    @Query("SELECT c FROM Customer c WHERE LOWER(c.email) = LOWER(:email)")
    Customer getCustomerByEmail(@Param("email") String email);

    @Modifying
    @Transactional
    @Query("update Customer c set c.firstName = :firstName, c.lastName = :lastName, c.email = :email, c.password = :password, c.birthDate = :birthDate, c.preferedSport = :preferedSport where c.id = :id")
    void editCustomer(int id, String firstName, String lastName, String email, String password, Date birthDate, String preferedSport);
}
