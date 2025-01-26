package org.example.backend4.repos;

import jakarta.transaction.Transactional;
import org.example.backend4.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.beans.Transient;
import java.sql.Date;

@Repository
public interface PaymentRepositoryImpl extends JpaRepository<Payment, Integer> {

    @Modifying
    @Transactional
    @Query("update Payment p set p.status = 'APPROVED', p.paymentDate = :today  where p.bookingId = :bookingId")
    void approvePayment(int bookingId, Date today);

    @Modifying
    @Transactional
    @Query("update Payment p set p.status = 'CANCELED' where p.bookingId = :bookingId")
    void cancelPayment(int bookingId);
}
