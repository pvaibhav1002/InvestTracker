package com.examly.springapp.service;
public interface Emailservice {
    String sendSimpleOtp(String to);
    boolean activateAccount(Long userId);
    void sendInquiryResponse(String to, String userName, String responseText) ;
}