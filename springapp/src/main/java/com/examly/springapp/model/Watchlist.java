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

    long userId;

    @ManyToOne
    @JoinColumn(name = "investment_id")
    Investment investment;

    public Watchlist() {
        this.userId = 0;
        this.investment = new Investment();
    }

    public Watchlist(Long id, long userId, Investment investment) {
        this.id = id;
        this.userId = userId;
        this.investment = investment;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Investment getInvestment() {
        return investment;
    }

    public void setInvestment(Investment investment) {
        this.investment = investment;
    }

}