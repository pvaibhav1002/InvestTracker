package com.examly.springapp.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.EmailRequest;
import com.examly.springapp.service.Emailservice;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private Emailservice emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
        emailService.sendSimpleMessage(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getText());
        return ResponseEntity.status(200).body("Email sent successfully");

    }

    @PostMapping("/otp")
    public ResponseEntity<String> sendEmailOtp(@RequestBody String to) {
        String otp = emailService.sendSimpleOtp(to);
        if (otp == null) {
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.status(200).body(otp);

    }

    @PutMapping("/verified/{userId}")
    public ResponseEntity<Map<String, String>> otpVerified(@PathVariable Long userId) {
        if (!emailService.activateAccount(userId)) {
            return ResponseEntity.status(500).body(Map.of("status", "Activation Failed"));
        }
        return ResponseEntity.ok(Map.of("status", "Account Activated"));
    }

    @PostMapping("/priceUpdate")
    public ResponseEntity<String> notifyPriceUpdate(@RequestBody String updatedPriceInfo) {
        emailService.sendPriceUpdateToAllUsers(updatedPriceInfo);
        return ResponseEntity.ok("Price update emails sent to all users.");
    }
    
    

}
