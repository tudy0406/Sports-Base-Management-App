package org.example.backend4.service;

import org.apache.coyote.Response;
import org.example.backend4.dto.CreateAccountRequest;
import org.example.backend4.dto.HourSent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.example.backend4.models.*;
import org.example.backend4.repos.*;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CustomerService {
    private final CustomerRepositoryImpl customerRepo;
    private final BookingRepositoryImpl bookingRepo;
    private final ReviewRepositoryImpl reviewRepo;
    private final PaymentRepositoryImpl paymentRepo;
    private final FieldRepositoryImpl fieldRepo;

    @Autowired
    public CustomerService(CustomerRepositoryImpl customerRepo, BookingRepositoryImpl bookingRepo, ReviewRepositoryImpl reviewRepo, PaymentRepositoryImpl paymentRepo, FieldRepositoryImpl fieldRepo) {
        this.customerRepo = customerRepo;
        this.bookingRepo = bookingRepo;
        this.reviewRepo = reviewRepo;
        this.paymentRepo = paymentRepo;
        this.fieldRepo = fieldRepo;
    }

    public Customer saveAccount(CreateAccountRequest customerDTO) {
        Customer customer = new Customer();
        customer.setFirstName(customerDTO.getFirstName());
        customer.setLastName(customerDTO.getLastName());
        customer.setEmail(customerDTO.getEmail());
        customer.setPassword(customerDTO.getPassword());
        customer.setBirthDate(customerDTO.getBirthDate());
        customer.setRole(customerDTO.getRole());
        customer.setPreferedSport("None");

        System.out.println(customer);
        return this.customerRepo.save(customer);
    }

    public ResponseEntity<String> registerBooking(Booking booking){
        try {
            this.bookingRepo.save(booking);
            Payment payment = new Payment();
            payment.setBookingId(booking.getId());
            payment.setAmount(booking.getTotalPrice());
            payment.setStatus(STATUS.PENDING);
            paymentRepo.save(payment);
            System.out.println("Booking registered successfully");
            return ResponseEntity.ok("Booking registered successfully");
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.ok("Booking failed: " + e.getMessage());
        }
    }

    public ResponseEntity<String> payBooking(int bookingId){
        try {
            bookingRepo.payBookingById(bookingId);
            Date today = Date.valueOf(LocalDate.now());
            paymentRepo.approvePayment(bookingId, today);
            fieldRepo.updateFieldUsageCountSinceMaintenance(bookingRepo.findBookingById(bookingId).getFieldId());
            return ResponseEntity.ok("Payment successful");
        }catch(Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    public ResponseEntity<String> addReview(Review review){
        try{
            this.reviewRepo.save(review);
            return ResponseEntity.ok("Review added succesfully");
        }catch(Exception e){
            return ResponseEntity.status(400).body("Review failed: " + e.getMessage());
        }
    }

    public ResponseEntity<List<HourSent>> getFreeHours(Date date, int fieldId) {
        List<HourSent> hours = new ArrayList<>();

        if(date.before(Date.valueOf(LocalDate.now()))) {
            return ResponseEntity.ok(hours);
        }
        if (date.equals(Date.valueOf(LocalDate.now()))) {
            Calendar c = Calendar.getInstance();
            for (int currentHour = Math.max(c.get(Calendar.HOUR_OF_DAY) + 1, 8); currentHour <= 21; currentHour++) {
                Time startTime = Time.valueOf(String.format("%02d:00:00", currentHour));
                Time endTime = Time.valueOf(String.format("%02d:00:00", currentHour + 1));
                hours.add(new HourSent(startTime, endTime));
            }
        } else {
            for (int hour = 8; hour <= 21; hour++) {
                Time startTime = Time.valueOf(String.format("%02d:00:00", hour));
                Time endTime = Time.valueOf(String.format("%02d:00:00", hour + 1));
                hours.add(new HourSent(startTime, endTime));
            }
        }

        System.out.println(hours);
        List<HourSent> bookedHours = bookingRepo.getBookedHours(date, fieldId);

        System.out.println("BookedHours for field: " + fieldId);
        System.out.println(bookedHours);

        List<HourSent> freeHours = hours.stream()
                .filter(hour -> bookedHours.stream()
                        .noneMatch(bookedHour -> bookedHour.getStartTime().equals(hour.getStartTime())))
                .toList();

        return ResponseEntity.ok(freeHours);
    }
}
