package org.example.backend4.repos;

import jakarta.transaction.Transactional;
import org.example.backend4.dto.HourSent;
import org.example.backend4.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface BookingRepositoryImpl extends JpaRepository<Booking, Integer> {

    @Query("select b from Booking b where b.customerId = :customerId order by b.bookingDate DESC, b.startTime asc")
    List<Booking> findBookingsByCustomerId(int customerId) ;

    @Query("select new org.example.backend4.dto.HourSent(b.startTime, b.endTime) from Booking b where b.fieldId = :fieldId and b.bookingDate = :date and (b.status = 'APPROVED'or b.status = 'PENDING')")
    List<HourSent> getBookedHours(Date date, int fieldId);

    @Modifying
    @Transactional
    @Query("update Booking b set b.status = 'APPROVED' where b.id = :id")
    void payBookingById(int id);

    @Modifying
    @Transactional
    @Query("UPDATE Booking b SET b.status = 'CANCELED' where b.id = :id")
    void cancelBookingById(int id);

    Booking findBookingById(int id);
}
