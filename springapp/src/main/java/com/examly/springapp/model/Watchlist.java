package com.examly.springapp.model;
 
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
 
@Entity
public class Watchlist {
    @Id
    @GeneratedValue
    private Long id;
 
    long user_id;
 
    @ManyToOne
    @JoinColumn(name = "investment_id")
    Investment investment;
 
    public Watchlist() {
        this.user_id = 0;
        this.investment = new Investment();
    }
 
    public Watchlist(Long id, long user_id, Investment investment) {
        this.id = id;
        this.user_id = user_id;
        this.investment = investment;
    }
 
    public Long getId() {
        return id;
    }
 
    public void setId(Long id) {
        this.id = id;
    }
 
    public long getUser_id() {
        return user_id;
    }
 
    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }
 
    public Investment getInvestment() {
        return investment;
    }
 
    public void setInvestment(Investment investment) {
        this.investment = investment;
    }
 
}