package com.examly.springapp.model;
 
import java.util.ArrayList;
import java.util.List;
 
import jakarta.persistence.*;
 
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long userId;
    private String email;
    private String password;
    private String username;
    private String mobileNumber;
    private String userRole;
    private boolean accountStatus;
 
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserInvestment> userInvestments = new ArrayList<>();
 
    public User() {
        this.email = "";
        this.password = "";
        this.username = "";
        this.mobileNumber = "";
        this.userRole = "";
        this.accountStatus = false;
        this.userInvestments = new ArrayList<>();
    }
 
    public User(Long userId, String email, String password, String username, String mobileNumber, String userRole,
            boolean accountStatus, List<UserInvestment> userInvestments) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.username = username;
        this.mobileNumber = mobileNumber;
        this.userRole = userRole;
        this.accountStatus = accountStatus;
        this.userInvestments = userInvestments;
    }
 
    public Long getUserId() {
        return userId;
    }
 
    public void setUserId(Long userId) {
        this.userId = userId;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
 
    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getMobileNumber() {
        return mobileNumber;
    }
 
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
 
    public String getUserRole() {
        return userRole;
    }
 
    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
 
    public boolean isAccountStatus() {
        return accountStatus;
    }
 
    public void setAccountStatus(boolean accountStatus) {
        this.accountStatus = accountStatus;
    }
 
    public List<UserInvestment> getUserInvestments() {
        return userInvestments;
    }
 
    public void setUserInvestments(List<UserInvestment> userInvestments) {
        this.userInvestments = userInvestments;
    }
}