package org.example.backend4.service;

import org.example.backend4.dto.FieldSent;
import org.example.backend4.dto.ReviewSent;
import org.example.backend4.models.*;
import org.example.backend4.repos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final SportRepositoryImpl sportRepo;
    private final FieldRepositoryImpl fieldRepo;
    private final BookingRepositoryImpl bookingRepo;
    private final PaymentRepositoryImpl paymentRepo;
    private final ReviewRepositoryImpl reviewRepo;
    private final UserRepositoryImpl userRepo;

    @Autowired
    public UserService(SportRepositoryImpl sportRepo, FieldRepositoryImpl fieldRepo, BookingRepositoryImpl bookingRepo, PaymentRepositoryImpl paymentRepo, ReviewRepositoryImpl reviewRepo, UserRepositoryImpl userRepo) {
        this.sportRepo = sportRepo;
        this.fieldRepo = fieldRepo;
        this.bookingRepo = bookingRepo;
        this.paymentRepo = paymentRepo;
        this.reviewRepo = reviewRepo;
        this.userRepo = userRepo;
    }

    public User getUserByEmail(String email) {
        return userRepo.getUserByEmail(email);
    }

    public ResponseEntity<List<Sport>> findAllSports() {
        List<Sport> sports = sportRepo.findAll();
        return ResponseEntity.ok(sports);
    }

    public ResponseEntity<List<FieldSent>> getFieldsSent(int filter){

        List<Field> fields;
        if(filter == 0)
            fields = fieldRepo.getAll();
        else{
            fields = fieldRepo.findBySportId(filter);
        }
        System.out.println(filter);
        List<FieldSent> fieldSents = new ArrayList<>();
        for(Field field : fields){
            FieldSent fieldSent = new FieldSent(
                    field.getId(),
                    field.getName(),
                    field.getSportId(),
                    sportRepo.findById(field.getSportId()).getName(),
                    field.getLength(),
                    field.getWidth(),
                    field.getHourPrice()
            );
            fieldSents.add(fieldSent);
        }

        for(FieldSent fieldSent : fieldSents){
            System.out.println(fieldSent);
        }
        return ResponseEntity.ok(fieldSents);
    }


    public ResponseEntity<List<Booking>> findBookingsByCustomerId(int userId){
        List<Booking> bookings = bookingRepo.findBookingsByCustomerId(userId);
        for(Booking booking : bookings ){
            System.out.println(booking);
        }
        return ResponseEntity.ok(bookings);
    }

    public ResponseEntity<Field> getFieldById(int fieldId){
        Optional<Field> field = fieldRepo.findById(fieldId);

        return ResponseEntity.ok(field.get());
    }

    public ResponseEntity<String> cancelBooking(int bookingId){
        try{
            bookingRepo.cancelBookingById(bookingId);
            paymentRepo.cancelPayment(bookingId);
            return ResponseEntity.ok("Booking cancellation successful");
        }catch(Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    public ResponseEntity<List<ReviewSent>> getReviewsSentByFieldId(int fieldId){
        try{
            List<Review> reviews = reviewRepo.getAllByFieldId(fieldId);
            List<ReviewSent> reviewsSent = new ArrayList<>();
            for(Review review : reviews){
                User user = userRepo.getUserById(review.getCustomerId());
                String userName = user.getFirstName() + " " + user.getLastName();
                ReviewSent reviewSent = new ReviewSent(
                        review.getId(),
                        userName,
                        review.getRating(),
                        review.getComment(),
                        review.getReviewDate()
                );
                reviewsSent.add(reviewSent);
            }
            return ResponseEntity.ok(reviewsSent);
        }catch(Exception e){
            System.out.println("ERROR REVIEW SENT: "+e.getMessage());
            return ResponseEntity.status(400).body(null);
        }
    }

    public ResponseEntity<List<User>> getUsers(String orderBy, String orderDirection){
        Sort sort = Sort.by(Sort.Direction.fromString(orderDirection), orderBy);
        try {
            List<User> users = userRepo.findAll(sort);
            return ResponseEntity.ok(users);
        }catch(Exception e){
            return ResponseEntity.status(400).body(null);
        }
    }
}
