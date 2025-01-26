package org.example.backend4.models;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "customer_id")
    private int customerId;

    @Column(name="field_id")
    private int fieldId;
    private int rating;
    private String comment;

    @Column(name="review_date")
    private Date reviewDate;

    public Review(){}

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

    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReview_date(Date review_date) {
        this.reviewDate = review_date;
    }
}