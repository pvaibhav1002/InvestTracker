package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;

import java.util.List;

@RestController

@RequestMapping("/api/feedback")
public class FeedbackController {

    FeedbackService feedbackService;
    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        Feedback createdFeedback = feedbackService.createFeedback(feedback);
        if (createdFeedback == null) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.status(201).body(createdFeedback);
    }

    @GetMapping("/{feedbackId}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long feedbackId) {
        Feedback feedback = feedbackService.getFeedbackById(feedbackId);
        if (feedback == null) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(feedback);
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        List<Feedback> feedbackList = feedbackService.getAllFeedbacks();
        if (feedbackList.isEmpty()) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(feedbackList);
    }

    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<Feedback> deleteFeedback(@PathVariable Long feedbackId) {
        Feedback feedback = feedbackService.deleteFeedback(feedbackId);
        if (feedback == null) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(200).body(feedback);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Feedback>> getFeedbackByUserId(@PathVariable Long userId) {
        List<Feedback> feedbackList = feedbackService.getFeedbacksByUserId(userId);
        if (feedbackList.isEmpty()) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(feedbackList);
    }

}
