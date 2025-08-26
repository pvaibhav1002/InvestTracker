package com.examly.springapp.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(DuplicateInvestmentException.class)
    public ResponseEntity<String> handleDuplicateInvestmentException(DuplicateInvestmentException e) {
        return ResponseEntity.status(400).body(e.getMessage());
    }

    @ExceptionHandler(DuplicateUser.class)
    public ResponseEntity<String> handleDuplicateUser(DuplicateUser e) {
        return ResponseEntity.status(400).body(e.getMessage());
    }

    @ExceptionHandler(InvestmentException.class)
    public ResponseEntity<String> handleInvestmentException(InvestmentException e) {
        return ResponseEntity.status(400).body(e.getMessage());
    }

    @ExceptionHandler(InvestmentInquiryException.class)
    public ResponseEntity<String> handleInvestmentInquiryException(InvestmentInquiryException e) {
        return ResponseEntity.status(400).body(e.getMessage());
    }

}
