package com.examly.springapp.service;
 
public interface Emailservice {
    void sendSimpleMessage(String to, String subject, String text);
    String sendSimpleOtp(String to);
    boolean activateAccount(Long userId);
}