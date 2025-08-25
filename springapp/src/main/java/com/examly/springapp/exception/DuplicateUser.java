package com.examly.springapp.exception;

public class DuplicateUser extends RuntimeException{
    public DuplicateUser(String message){
        super(message);
    }
}
