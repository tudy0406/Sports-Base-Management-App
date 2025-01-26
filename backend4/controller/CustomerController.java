package org.example.backend4.controller;

import org.example.backend4.dto.HourSent;
import org.example.backend4.models.Booking;
import org.example.backend4.models.Customer;
import org.example.backend4.models.Review;
import org.example.backend4.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/hours")
    public ResponseEntity<List<HourSent>> addHours(@RequestParam Date date, @RequestParam int fieldId) {
        return customerService.getFreeHours(date, fieldId);
    }

    @PostMapping("/book")
    public ResponseEntity<String> addBooking(@RequestBody Booking booking) {
        return customerService.registerBooking(booking);
    }

    @PostMapping("/addReview")
    public ResponseEntity<String> addReview(@RequestBody Review review) {
        return customerService.addReview(review);
    }

    @PostMapping("/payBooking")
    public ResponseEntity<String> payBookingById(@RequestParam int bookingId){
        return customerService.payBooking(bookingId);
    }
}

