package com.evan.pethomespring.service;

import com.evan.pethomespring.exception.ReviewNotFoundException;
import com.evan.pethomespring.model.Review;
import com.evan.pethomespring.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImp {
    @Autowired
    private ReviewRepository reviewRepository;

    public Review saveReview(Review review) { return reviewRepository.save(review); }
    public List<Review> findAllUsers(){ return reviewRepository.findAll(); }
    public Review findReviewById(Long reviewId) { return reviewRepository.getReferenceById(reviewId); }

    public Review updateReviewById(Long reviewId, Review newReview) throws ReviewNotFoundException{
        Review exitReview = reviewRepository.findById(reviewId).orElse(null);
        if (exitReview != null) {
            exitReview.setUser(newReview.getUser());
            exitReview.setProduct(newReview.getProduct());
            exitReview.setContent(newReview.getContent());

            return reviewRepository.save(exitReview);
        } else {
            throw new ReviewNotFoundException(reviewId);
        }
    }

    public String deleteReviewById(Long reviewId) throws ReviewNotFoundException {
        if (!reviewRepository.existsById(reviewId)) {
            throw new ReviewNotFoundException(reviewId);
        }
        reviewRepository.deleteById(reviewId);

        return "Review with id: " + reviewId + " has been deleted successfully!";
    }
}
