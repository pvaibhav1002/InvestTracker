package com.examly.springapp.model;
 
import java.time.LocalDateTime;
 
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
 
@Entity
public class InvestmentInquiry {
    @Id
    @GeneratedValue
    Long inquiryId;
    String reasonOfInterest;
    String questions;
    LocalDateTime inquiryDate;
    String riskTolerance;
    String expectedReturn;
    String status;
    LocalDateTime responseDate;
    String adminResponse;
    String contactDetails;
 
    @ManyToOne
    @JoinColumn(name = "investmentId", nullable = false)
    Investment investment;
 
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    User user;
 
    public InvestmentInquiry() {
        this.reasonOfInterest = "";
        this.questions = "";
        this.inquiryDate = LocalDateTime.now();
        this.riskTolerance = "";
        this.expectedReturn = "";
        this.status = "";
        this.responseDate = LocalDateTime.now();
        this.adminResponse = "";
        this.contactDetails = "";
        this.investment = new Investment();
        this.user = new User();
    }
 
    public InvestmentInquiry(Long inquiryId, String reasonOfInterest, String questions, LocalDateTime inquiryDate,
            String riskTolerance, String expectedReturn, String status, LocalDateTime responseDate,
            String adminResponse, String contactDetails, Investment investment, User user) {
        this.inquiryId = inquiryId;
        this.reasonOfInterest = reasonOfInterest;
        this.questions = questions;
        this.inquiryDate = inquiryDate;
        this.riskTolerance = riskTolerance;
        this.expectedReturn = expectedReturn;
        this.status = status;
        this.responseDate = responseDate;
        this.adminResponse = adminResponse;
        this.contactDetails = contactDetails;
        this.investment = investment;
        this.user = user;
    }
 
    public Long getInquiryId() {
        return inquiryId;
    }
 
    public void setInquiryId(Long inquiryId) {
        this.inquiryId = inquiryId;
    }
 
    public String getReasonOfInterest() {
        return reasonOfInterest;
    }
 
    public void setReasonOfInterest(String reasonOfInterest) {
        this.reasonOfInterest = reasonOfInterest;
    }
 
    public String getQuestions() {
        return questions;
    }
 
    public void setQuestions(String questions) {
        this.questions = questions;
    }
 
    public LocalDateTime getInquiryDate() {
        return inquiryDate;
    }
 
    public void setInquiryDate(LocalDateTime inquiryDate) {
        this.inquiryDate = inquiryDate;
    }
 
    public String getRiskTolerance() {
        return riskTolerance;
    }
 
    public void setRiskTolerance(String riskTolerance) {
        this.riskTolerance = riskTolerance;
    }
 
    public String getExpectedReturn() {
        return expectedReturn;
    }
 
    public void setExpectedReturn(String expectedReturn) {
        this.expectedReturn = expectedReturn;
    }
 
    public String getStatus() {
        return status;
    }
 
    public void setStatus(String status) {
        this.status = status;
    }
 
    public LocalDateTime getResponseDate() {
        return responseDate;
    }
 
    public void setResponseDate(LocalDateTime responseDate) {
        this.responseDate = responseDate;
    }
 
    public String getAdminResponse() {
        return adminResponse;
    }
 
    public void setAdminResponse(String adminResponse) {
        this.adminResponse = adminResponse;
    }
 
    public String getContactDetails() {
        return contactDetails;
    }
 
    public void setContactDetails(String contactDetails) {
        this.contactDetails = contactDetails;
    }
 
    public Investment getInvestment() {
        return investment;
    }
 
    public void setInvestment(Investment investment) {
        this.investment = investment;
    }
 
    public User getUser() {
        return user;
    }
 
    public void setUser(User user) {
        this.user = user;
    }
 
}