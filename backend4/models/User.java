package org.example.backend4.models;

import jakarta.persistence.*;

import java.sql.Date;


@Entity
@Inheritance(strategy = InheritanceType.JOINED) // This maps inheritance to separate tables
@Table(name = "users")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int id;

    @Column(name = "first_name")
    protected String firstName;

    @Column(name="last_name")
    protected String lastName;

    @Column(name="email")
    protected String email;

    @Column(name="password")
    protected String password;

    @Column(name="birth_date")
    protected Date birthDate;

    @Column(name="role")
    protected String role;

    public User(){};

    public String getFirstName() {return firstName;}

    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getLastName() {return lastName;}

    public void setLastName(String lastName) {this.lastName = lastName;}

    public int getId() {return id;}

    public void setId(int id) {this.id = id;}

    public String getEmail() {return email;}

    public void setEmail(String email) {this.email = email;}

    public String getPassword() {return password;}

    public void setPassword(String password) {this.password = password;}

    public Date getBirthDate() {return birthDate;}

    public void setBirthDate(Date birthDate) {this.birthDate = birthDate;}

    public String getRole() {return role;}

    public void setRole(String role) {this.role = role;}
}
