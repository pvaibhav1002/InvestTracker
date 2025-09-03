package com.examly.springapp.service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class EmailServiceImpl implements Emailservice {
    private JavaMailSender emailSender;
    private UserRepo userRepo;
    private String from = "do.not.reply.investtrack@gmail.com";
    private static final SecureRandom RANDOM = new SecureRandom();

    @Autowired
    public EmailServiceImpl(JavaMailSender emailSender, UserRepo userRepo) {
        this.emailSender = emailSender;
        this.userRepo = userRepo;
    }

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    public String sendSimpleOtp(String to) {
        try {
            int randnum = 100000 + RANDOM.nextInt(900000);
            String otp = String.valueOf(randnum);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(from);
            message.setTo(to);
            message.setSubject("Verify your email address");
            message.setText("Your OTP is " + otp);
            emailSender.send(message);
            return otp;
        } catch (Exception e) {
            return null;
        }
    }

    public boolean activateAccount(Long userId) {
        Optional<User> user = userRepo.findById(userId);
        if (user.isPresent()) {
            User userStatus = user.get();
            userStatus.setAccountStatus(true);
            userRepo.save(userStatus);
            return true;
        }
        return false;
    }
    public void sendInquiryConfirmation(String to, String userName) {
        String subject = "Inquiry Submitted Successfully";
        String text = "Dear " + userName
                + ",\n\nThank you for your inquiry. We have received your request and will get back to you shortly.\n\nBest regards,\nInvestTrack Team";
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    public void sendPriceUpdateToAllUsers(String updatedPriceInfo) {
        List<User> users = userRepo.findAll();
        String subject = "Important: Price Update Notification";
        String text = "Dear User,\n\nWe would like to inform you that the price has been updated:\n"
                + updatedPriceInfo + "\n\nThank you for staying with us.\nInvestTrack Team";
        for (User user : users) {
            if (user.getEmail() != null && !user.getEmail().isEmpty()) {
                sendSimpleMessage(user.getEmail(), subject, text);
            }
        }
    }

}
