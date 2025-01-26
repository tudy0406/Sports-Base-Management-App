package org.example.backend4.dto;

import java.sql.Date;

public class ReviewSent {
    private int id;
    private String customerName;
    private int rating;
    private String comment;
    private Date reviewDate;

    public ReviewSent(int id, String customerName, int rating, String comment, Date date) {
        this.id = id;
        this.customerName = customerName;
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getDate() {
        return reviewDate;
    }

    public void setDate(Date date) {
        this.reviewDate = date;
    }
}
