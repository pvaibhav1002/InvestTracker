package com.examly.springapp.service;
 
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.Random;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
 
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
 
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
 
@Service
public class EmailserviceImpl implements Emailservice {
 
    private JavaMailSender emailSender;
    UserRepo userRepo;
 
    @Autowired
    public EmailserviceImpl(JavaMailSender emailSender, UserRepo userRepo) {
        this.emailSender = emailSender;
        this.userRepo = userRepo;
    }
 
    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("do.not.reply.investtrack@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }
 
    public String sendSimpleOtp(String to) {
        try {
            Random random = new Random();
            int randnum = 100000 + random.nextInt(900000);
            String otp = String.valueOf(randnum);
 
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("do.not.reply.investtrack@gmail.com");
            message.setTo(to);
            message.setSubject("Verify your email address");
            message.setText("Your OTP is " +otp);
            emailSender.send(message);
            return otp;
        } catch (Exception e) {
            e.printStackTrace();
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
 
}
