package com.examly.springapp.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;

@Entity
@AllArgsConstructor
public class Investment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long investmentId;
    private String name;
    private String description;
    private String type;
    private double price;
    private int quantity;
    private String postedDate;
    private String capSize;
    private String sector;
    private String status;

    // @OneToMany(mappedBy = "investment", cascade = CascadeType.ALL, orphanRemoval
    // = true)
    // @JsonManagedReference
    // private List<UserInvestment> userInvestments = new ArrayList<>();

    public Investment() {
        this.name = "";
        this.description = "";
        this.type = "";
        this.price = 0;
        this.quantity = 0;
        this.postedDate = "";
        this.capSize = "";
        this.sector = "";
        this.status = "";
        // this.userInvestments = new ArrayList<>();
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(String postedDate) {
        this.postedDate = postedDate;
    }

    public String getCapSize() {
        return capSize;
    }

    public void setCapSize(String capSize) {
        this.capSize = capSize;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // public List<UserInvestment> getUserInvestments() {
    // return userInvestments;
    // }

    // public void setUserInvestments(List<UserInvestment> userInvestments) {
    // this.userInvestments = userInvestments;
    // }

}
