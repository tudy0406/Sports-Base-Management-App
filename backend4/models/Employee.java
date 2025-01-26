package org.example.backend4.models;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="employees")
public class Employee extends User{
    private final double salary = 3500.00;
    private Date hireDate;

    public Employee(){};


    public double getSalary() {
        return salary;
    }

    public Date getHireDate() {
        return hireDate;
    }

    public void setHireDate(Date hireDate) {this.hireDate = hireDate;}

    @Override
    public String toString() {
        return String.format("Employee [id = %d, firstName = %s, lastName = %s, email = %s, password = %s, birthDate = %s, salary = %.2f, hireDate = %s]", id, firstName, lastName, email, password, birthDate, salary, hireDate);
    }
}