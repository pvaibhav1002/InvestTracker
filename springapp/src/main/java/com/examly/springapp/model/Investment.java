package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Investment {
    @Id
    @GeneratedValue
    private Long investmentId;
    private String name;
    private String description;
    private String type;
    private double purchasePrice;
    private double currentPrice;
    private int quantity;
    private String purchaseDate;
    private String status;

    public Investment() {
        this.name = "";
        this.description = "";
        this.type = "";
        this.purchasePrice = 0;
        this.currentPrice = 0;
        this.quantity = 0;
        this.purchaseDate = "";
        this.status = "";
    }

    public Investment(Long investmentId, String name, String description, String type, double purchasePrice,
            double currentPrice, int quantity, String purchaseDate, String status) {
        this.investmentId = investmentId;
        this.name = name;
        this.description = description;
        this.type = type;
        this.purchasePrice = purchasePrice;
        this.currentPrice = currentPrice;
        this.quantity = quantity;
        this.purchaseDate = purchaseDate;
        this.status = status;
    }

    public Long getInvestmentId() {
        return investmentId;
    }

    public void setInvestmentId(Long investmentId) {
        this.investmentId = investmentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(String purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
