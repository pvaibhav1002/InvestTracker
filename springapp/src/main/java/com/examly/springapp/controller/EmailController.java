package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.EmailRequest;
import com.examly.springapp.service.Emailservice;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired

    private Emailservice emailService;

    @PostMapping("/send")

    public String sendEmail(@RequestBody EmailRequest emailRequest) {

        emailService.sendSimpleMessage(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getText());

        return "Email sent successfully";

    }

}
