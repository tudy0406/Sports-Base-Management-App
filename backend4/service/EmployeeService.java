package org.example.backend4.service;


import org.apache.coyote.Response;
import org.example.backend4.dto.CreateAccountRequest;
import org.example.backend4.models.*;
import org.example.backend4.repos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class EmployeeService {

    private final String employeePassword = "fortalidl";
    private final EmployeeRepositoryImpl employeeRepo;
    private final BookingRepositoryImpl bookingRepo;
    private final SportRepositoryImpl sportRepo;
    private final FieldRepositoryImpl fieldRepo;
    private final MaintenanceRepositoryImpl maintRepo;
    private final CustomerRepositoryImpl customerRepo;
    private final ReviewRepositoryImpl reviewRepo;
    private final UserService userService;
    private final PaymentRepositoryImpl paymentRepo;

    @Autowired
    public EmployeeService(EmployeeRepositoryImpl employeeRepository, BookingRepositoryImpl bookingRepository, SportRepositoryImpl sportRepository, FieldRepositoryImpl fieldRepository, MaintenanceRepositoryImpl maintenanceRepository, CustomerRepositoryImpl customerRepository, UserService userService, ReviewRepositoryImpl reviewRepository, PaymentRepositoryImpl paymentRepositoryImpl) {
        this.employeeRepo = employeeRepository;
        this.bookingRepo = bookingRepository;
        this.sportRepo = sportRepository;
        this.fieldRepo = fieldRepository;
        this.maintRepo = maintenanceRepository;
        this.customerRepo = customerRepository;
        this.userService = userService;
        this.reviewRepo = reviewRepository;
        this.paymentRepo = paymentRepositoryImpl;
    }

    public Employee saveAccount(CreateAccountRequest employeeDTO) {
        if(!employeeDTO.getEmployeePassword().equals(employeePassword)) {
            return null;
        }

        Employee employee = new Employee();
        employee.setFirstName(employeeDTO.getFirstName());
        employee.setLastName(employeeDTO.getLastName());
        employee.setEmail(employeeDTO.getEmail());
        employee.setPassword(employeeDTO.getPassword());
        employee.setBirthDate(employeeDTO.getBirthDate());
        employee.setRole(employeeDTO.getRole());
        employee.setHireDate(Date.valueOf(String.valueOf(LocalDate.now())));

        return this.employeeRepo.save(employee);
    }

    public ResponseEntity<String> addSport(Sport sport){
        try{
            sportRepo.save(sport);
            return ResponseEntity.ok("Sport added");
        }catch(Exception e){
            return ResponseEntity.status(400).body("Sport not added: " + e.getMessage());
        }
    }

    public ResponseEntity<String> addField(Field field){
        try{
            fieldRepo.save(field);
            return ResponseEntity.ok("Field added");
        }catch(Exception e){
            return ResponseEntity.status(400).body("Field not added: " + e.getMessage());
        }
    }


    public ResponseEntity<String> addMaintenance(Maintenance maintenance){
        try{
            maintRepo.save(maintenance);
            fieldRepo.setFieldUsageCountSinceMaintenance(maintenance.getFieldId());
            return ResponseEntity.ok("Maintenance added successfully");
        }catch (Exception e){
            return ResponseEntity.status(400).body("Error adding maintenance "+e.getMessage());
        }
    }

    public boolean checkEmployeePassword(String employeePassword){
        return this.employeePassword.equals(employeePassword);
    }

    public ResponseEntity<String> deleteCustomer(int id){
        try{
            customerRepo.deleteById(id);
            return ResponseEntity.ok("Customer deleted successfully");
        }catch(Exception e){
            return ResponseEntity.status(400).body("Customer deletion failed");
        }
    }

    public ResponseEntity<String> editCustomer(Customer customer){
        try{
            customerRepo.editCustomer(
                        customer.getId(),
                        customer.getFirstName(),
                        customer.getLastName(),
                        customer.getEmail(),
                        customer.getPassword(),
                        customer.getBirthDate(),
                        customer.getPreferedSport()
                    );
            return ResponseEntity.ok("Customer updated");
        }catch(Exception e){
            return ResponseEntity.status(400).body("Customer not updated");
        }
    }

    public ResponseEntity<String> deleteSport(int id){
        try{
            sportRepo.deleteById(id);
            return ResponseEntity.ok("Sport deleted successfully");
        }catch(Exception e){
            return ResponseEntity.status(400).body("Sport deletion failed");
        }
    }

    public ResponseEntity<String> editSport(Sport sport){
        try{
            sportRepo.editSport(
                    sport.getId(),
                    sport.getName(),
                    sport.getDescription()
            );
            return ResponseEntity.ok("Sport updated");
        }catch(Exception e){
            return ResponseEntity.status(400).body("Sport not updated");
        }
    }

    public ResponseEntity<String> deleteField(int id){
        try{
            fieldRepo.deleteById(id);
            return ResponseEntity.ok("Field deleted successfully");
        }catch(Exception e){
            return ResponseEntity.status(400).body("Field deletion failed");
        }
    }

    public ResponseEntity<String> editField(Field field){
        try{
            fieldRepo.editField(
                    field.getId(),
                    field.getName(),
                    field.getSportId(),
                    field.getLength(),
                    field.getWidth(),
                    field.getHourPrice()
            );
            return ResponseEntity.ok("Field updated");
        }catch(Exception e){
            return ResponseEntity.status(400).body("Field update failed");
        }
    }

    public ResponseEntity<List<Sport>> getSports(String orderBy, String orderDirection){
        Sort sort = Sort.by(Sort.Direction.fromString(orderDirection), orderBy);
        try{
            List<Sport> sports = sportRepo.findAll(sort);
            return ResponseEntity.ok(sports);
        }catch(Exception e){
            return ResponseEntity.status(400).body(null);
        }
    }

    public ResponseEntity<List<Field>> getFields(String orderBy, String orderDirection){
        Sort sort = Sort.by(Sort.Direction.fromString(orderDirection), orderBy);
        try{
            List<Field> fields = fieldRepo.findAll(sort);
            return ResponseEntity.ok(fields);
        }catch(Exception e){
            return ResponseEntity.status(400).body(null);
        }
    }

    public ResponseEntity<List<Maintenance>> getMaintenances(String orderBy, String orderDirection){
        Sort sort = Sort.by(Sort.Direction.fromString(orderDirection), orderBy);
        try{
            List<Maintenance> maintenances = maintRepo.findAll(sort);
            return ResponseEntity.ok(maintenances);
        }catch(Exception e){
            return ResponseEntity.status(400).body(null);
        }
    }

    public ResponseEntity<List<Review>> getReviews(String orderBy, String orderDirection){
        Sort sort = Sort.by(Sort.Direction.fromString(orderDirection), orderBy);
        try{
            List<Review> reviews = reviewRepo.findAll(sort);
            return ResponseEntity.ok(reviews);
        }catch(Exception e){
            return ResponseEntity.status(400).body(null);
        }
    }

    public ResponseEntity<List<Booking>> getBookings(String orderBy, String orderDirection){
        Sort sort = Sort.by(Sort.Direction.fromString(orderDirection), orderBy);
        try{
            List<Booking> bookings = bookingRepo.findAll(sort);
            return ResponseEntity.ok(bookings);
        }catch(Exception e){
            return ResponseEntity.status(400).body(null);
        }
    }

    public ResponseEntity<List<Payment>> getPayments(String orderBy, String orderDirection){
        Sort sort = Sort.by(Sort.Direction.fromString(orderDirection), orderBy);
        try{
            List<Payment> payments = paymentRepo.findAll(sort);
            return ResponseEntity.ok(payments);
        }catch(Exception e){
            return ResponseEntity.status(400).body(null);
        }
    }
}
