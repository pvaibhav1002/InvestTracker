package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepo;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    FeedbackRepo feedbackRepo;

    @Autowired
    public FeedbackServiceImpl(FeedbackRepo feedbackRepo) {
        this.feedbackRepo = feedbackRepo;
    }

    @Override
    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    @Override
    public Feedback deleteFeedback(Long feedbackId) {

        Optional<Feedback> optionalFeedback = feedbackRepo.findById(feedbackId);
        if (optionalFeedback.isPresent()) {
            Feedback feedback = optionalFeedback.get();
            feedbackRepo.delete(feedback);
            return feedback;
        }
        return null;
    }

    

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }

    @Override
    public Feedback getFeedbackById(Long feedbackId) {
        Optional<Feedback> optFeed = feedbackRepo.findById(feedbackId);
        if (optFeed.isPresent()) {
            return optFeed.get();
        }
        return null;
    }

    @Override
    public List<Feedback> getFeedbacksByInvestmentId(Long investmentId) {

        return feedbackRepo.findByInvestmentId(investmentId);
    }

    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {

        return feedbackRepo.findByUserId(userId);
    }

}
