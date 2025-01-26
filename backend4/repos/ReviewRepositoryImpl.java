package org.example.backend4.repos;

import org.example.backend4.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepositoryImpl extends JpaRepository<Review, Integer> {

    @Query("select r from Review r where r.fieldId = :fieldId order by r.reviewDate desc, r.id desc")
    List<Review> getAllByFieldId(int fieldId);
}
