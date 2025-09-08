package com.examly.springapp.service;

import java.security.SecureRandom;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class EmailServiceImpl implements Emailservice {
    private JavaMailSender emailSender;
    private UserRepo userRepo;
     @Value("${spring.mail.username}")
    private String from ;
    private static final SecureRandom RANDOM = new SecureRandom();

    @Autowired
    public EmailServiceImpl(JavaMailSender emailSender, UserRepo userRepo) {
        this.emailSender = emailSender;
        this.userRepo = userRepo;
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

    public void sendInquiryResponse(String to, String userName, String responseText) {
        String subject = "Admin Response to Inquiry";
        String text = "Dear " + userName + ",\n\n"
                + "Thank you for reaching out to us with your inquiry.\n\n"
                + "Admin Response:\n" + responseText + "\n\n"
                + "If you have any further questions or need additional assistance, please feel free to contact us.\n\n"
                + "Best regards,\n"
                + "Admin Team";
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

}
