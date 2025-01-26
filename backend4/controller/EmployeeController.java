package org.example.backend4.controller;

import org.example.backend4.models.*;
import org.example.backend4.service.EmployeeService;
import org.example.backend4.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class EmployeeController{
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/addSport")
    public ResponseEntity<String> addSport(@RequestBody Sport sport){
        return employeeService.addSport(sport);
    }

    @PostMapping("/addField")
    public ResponseEntity<String> addField(@RequestBody Field field){
        return employeeService.addField(field);
    }

    @PostMapping("/addMaintenance")
    public ResponseEntity<String> addMaintenance(@RequestBody Maintenance maintenance) {
        return employeeService.addMaintenance(maintenance);
    }

    @PostMapping("/delCustomer")
    public ResponseEntity<String> delCustomer(@RequestParam int id) {
        return employeeService.deleteCustomer(id);
    }

    @PostMapping("/editCustomer")
    public ResponseEntity<String> editCustomer(@RequestBody Customer customer) {
        return employeeService.editCustomer(customer);
    }

    @PostMapping("/delSport")
    public ResponseEntity<String> delSport(@RequestParam int id) {
        return employeeService.deleteSport(id);
    }

    @PostMapping("/editSport")
    public ResponseEntity<String> editSport(@RequestBody Sport sport) {
        return employeeService.editSport(sport);
    }

    @PostMapping("/delField")
    public ResponseEntity<String> delField(@RequestParam int id) {
        return employeeService.deleteField(id);
    }

    @PostMapping("/editField")
    public ResponseEntity<String> editField(@RequestBody Field field) {
        return employeeService.editField(field);
    }

    @GetMapping("/getSports")
    public ResponseEntity<List<Sport>> getSports(@RequestParam String orderBy,@RequestParam String orderDirection) {
        return employeeService.getSports(orderBy, orderDirection);
    }
    @GetMapping("/getFields")
    public ResponseEntity<List<Field>> getFields(@RequestParam String orderBy,@RequestParam String orderDirection) {
        return employeeService.getFields(orderBy, orderDirection);
    }
    @GetMapping("/getMaintenances")
    public ResponseEntity<List<Maintenance>> getMaintenances(@RequestParam String orderBy,@RequestParam String orderDirection) {
        return employeeService.getMaintenances(orderBy, orderDirection);
    }
    @GetMapping("/getReviews")
    public ResponseEntity<List<Review>> getReviews(@RequestParam String orderBy,@RequestParam String orderDirection) {
        return employeeService.getReviews(orderBy, orderDirection);
    }
    @GetMapping("/getBookings")
    public ResponseEntity<List<Booking>> getBookings(@RequestParam String orderBy,@RequestParam String orderDirection) {
        return employeeService.getBookings(orderBy, orderDirection);
    }
    @GetMapping("/getPayments")
    public ResponseEntity<List<Payment>> getPayments(@RequestParam String orderBy,@RequestParam String orderDirection) {
        return employeeService.getPayments(orderBy, orderDirection);
    }

}
