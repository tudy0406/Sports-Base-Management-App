package org.example.backend4.controller;

import org.example.backend4.dto.FieldSent;
import org.example.backend4.dto.ReviewSent;
import org.example.backend4.models.*;
import org.example.backend4.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getUsers(@RequestParam String orderBy,@RequestParam String orderDirection) {
        return userService.getUsers(orderBy,orderDirection);
    }

    @GetMapping("/fields")
    public ResponseEntity<List<FieldSent>> getFieldsList(@RequestParam int filter){
        return userService.getFieldsSent(filter);
    }

    @GetMapping("/sports")
    public ResponseEntity<List<Sport>> getSportsList(){
        return userService.findAllSports();
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getBookingsListByCustomerId(@RequestParam int userId){
        return userService.findBookingsByCustomerId(userId);
    }

    @GetMapping("/field")
    public ResponseEntity<Field> getFieldById(@RequestParam int fieldId){
        return userService.getFieldById(fieldId);
    }

    @PostMapping("/cancelBooking")
    public ResponseEntity<String> cancelBookingById(@RequestParam int bookingId){
        return userService.cancelBooking(bookingId);
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewSent>> getReviewsList(@RequestParam int fieldId){
        return userService.getReviewsSentByFieldId(fieldId);
    }
}
