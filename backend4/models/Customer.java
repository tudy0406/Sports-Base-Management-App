package org.example.backend4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "customers")
public class Customer extends User{

    @Column(name="prefered_sport")
    private String preferedSport;

    public Customer(){}

    public String getPreferedSport() {
        return preferedSport;
    }

    public void setPreferedSport(String preferredSport) {
        this.preferedSport = preferredSport;
    }

    @Override
    public String toString() {
        return String.format("Customer [id = %d, firstName = %s, lastName = %s, email = %s, password = %s, birthDate = %s, preferedSport = %s]", id, firstName, lastName, email, password, birthDate, preferedSport);
    }
}
