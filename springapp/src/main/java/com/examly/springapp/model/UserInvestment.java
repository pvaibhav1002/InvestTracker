package com.examly.springapp.model;
 
import jakarta.persistence.*;
import java.time.LocalDateTime;
 
@Entity
public class UserInvestment {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantityBought;
    private LocalDateTime purchaseDate;
    private double purchasePrice;
 
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
 
    @ManyToOne
    @JoinColumn(name = "investment_id", nullable = false)
    private Investment investment;
 
    public UserInvestment() {
        this.user = new User();
        this.investment = new Investment();
        this.quantityBought = 0;
        this.purchaseDate = LocalDateTime.now();
        this.purchasePrice = 0.0; // default value
    }
 
    public UserInvestment(Long id, User user, Investment investment, int quantityBought, LocalDateTime purchaseDate,
            double purchasePrice) {
        this.id = id;
        this.user = user;
        this.investment = investment;
        this.quantityBought = quantityBought;
        this.purchaseDate = purchaseDate;
        this.purchasePrice = purchasePrice;
    }
 
    public Long getId() {
        return id;
    }
 
    public void setId(Long id) {
        this.id = id;
    }
 
    public User getUser() {
        return user;
    }
 
    public void setUser(User user) {
        this.user = user;
    }
 
    public Investment getInvestment() {
        return investment;
    }
 
    public void setInvestment(Investment investment) {
        this.investment = investment;
    }
 
    public int getQuantityBought() {
        return quantityBought;
    }
 
    public void setQuantityBought(int quantityBought) {
        this.quantityBought = quantityBought;
    }
 
    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }
 
    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }
 
    public double getPurchasePrice() {
        return purchasePrice;
    }
 
    public void setPurchasePrice(double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }
 
}