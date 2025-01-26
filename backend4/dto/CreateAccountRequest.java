package org.example.backend4.dto;

import java.sql.Date;

public class CreateAccountRequest {
    private String firstName;
    private String lastName;
    private Date birthDate;
    private String email;
    private String password;
    private String role;
    private String employeePassword;

    public String getFirstName() {return firstName;}

    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getLastName() {return lastName;}

    public void setLastName(String lastName) {this.lastName = lastName;}

    public Date getBirthDate() {return birthDate;}

    public void setBirthDate(Date birthDate) {this.birthDate = birthDate;}

    public String getEmail() {return email;}

    public void setEmail(String email) {this.email = email;}

    public String getPassword() {return password;}

    public void setPassword(String password) {this.password = password;}

    public String getRole() {return role;}

    public void setRole(String role) {this.role = role;}

    public String getEmployeePassword() {return employeePassword;}

    public void setEmployeePassword(String employeePassword) {this.employeePassword = employeePassword;}

    @Override
    public String toString() {
        return String.format("createAccountRequest [firstName = %s, lastName = %s, email = %s, password = %s, birthDate = %s, role = %s, employeePassword = %s]", firstName, lastName, email, password, birthDate, role, employeePassword);
    }
}
