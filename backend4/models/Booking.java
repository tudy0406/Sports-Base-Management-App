package org.example.backend4.models;
import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="customer_id")
    private int customerId;
    @Column(name="field_id")
    private int fieldId;
    @Column(name="booking_date")
    private Date bookingDate;
    @Column(name="start_time")
    private Time startTime;
    @Column(name="end_time")
    private Time endTime;
    @Column(name="price")
    private double totalPrice;
    @Enumerated(EnumType.STRING)
    private STATUS status;

    public Booking() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customer_id) {
        this.customerId = customer_id;
    }

    public int getFieldId() {
        return fieldId;
    }

    public void setFieldId(int field_id) {
        this.fieldId = field_id;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date booking_date) {
        this.bookingDate = booking_date;
    }

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time start_time) {
        this.startTime = start_time;
    }

    public Time getEndTime() {
        return endTime;
    }

    public void setEndTime(Time end_time) {
        this.endTime = end_time;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double total_price) {
        this.totalPrice = total_price;
    }

    public STATUS getStatus() {
        return status;
    }

    public void setStatus(STATUS status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Booking [id=" + id + ", customerId=" + customerId + ", fieldId=" + fieldId + ", bookingDate=" + bookingDate + ", startTime=" + startTime + ", endTime=" + endTime + ", totalPrice=" + totalPrice + ", status=" + status + "]";
    }
}