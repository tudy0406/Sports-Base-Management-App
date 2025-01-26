package org.example.backend4.models;
import jakarta.persistence.*;

@Entity
@Table(name = "fields")
public class Field {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Column(name = "sport_id")
    private int sportId;
    private int length;
    private int width;

    @Column(name = "hour_price")
    private double hourPrice;

    @Column(name = "usage_count_since_maintenance")
    private int usageCountSinceMaintenance;

    public Field() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSportId() {
        return sportId;
    }

    public void setSport_id(int sport_id) {
        this.sportId = sport_id;
    }

    public int getLength() {
        return length;
    }
    public void setLength(int length) {
        this.length = length;
    }
    public int getWidth() {
        return width;
    }
    public void setWidth(int width) {
        this.width = width;
    }

    public double getHourPrice() {
        return hourPrice;
    }

    public void setHourPrice(double hourPrice) {
        this.hourPrice = hourPrice;
    }

    public int getUsageCountSinceMaintenance() {
        return usageCountSinceMaintenance;
    }

    public void setUsageCountSinceMaintenance(int usage_count_since_maintenance) {
        this.usageCountSinceMaintenance = usage_count_since_maintenance;
    }
}
