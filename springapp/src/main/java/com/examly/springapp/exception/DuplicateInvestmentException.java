package com.examly.springapp.exception;

public class DuplicateInvestmentException extends RuntimeException {
    public DuplicateInvestmentException(String message) {
        super(message);
    }

}
