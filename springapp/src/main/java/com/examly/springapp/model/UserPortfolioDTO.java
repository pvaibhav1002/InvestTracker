package com.examly.springapp.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserPortfolioDTO {
    private Double totalInvested;
    private Double currentValue;
    private Double profitOrLossAmount;
    private String profitOrLossLabel;
    private Map<String, Long> distributionByType;
    private Map<String, Long> distributionBySector;
    private Map<String, Long> distributionByCapSize;
    private List<InvestmentSummary> investments;  // ✅ list of detailed investments

    public UserPortfolioDTO() {
        this.totalInvested = 0.0;
        this.currentValue = 0.0;
        this.profitOrLossAmount = 0.0;
        this.profitOrLossLabel = "Neutral";
        this.distributionByType = new HashMap<>();
        this.distributionBySector = new HashMap<>();
        this.distributionByCapSize = new HashMap<>();
        this.investments = new ArrayList<>();
    }

    public UserPortfolioDTO(Double totalInvested, Double currentValue, Double profitOrLossAmount,
                            String profitOrLossLabel,
                            Map<String, Long> distributionByType,
                            Map<String, Long> distributionBySector,
                            Map<String, Long> distributionByCapSize,
                            List<InvestmentSummary> investments) {
        this.totalInvested = totalInvested;
        this.currentValue = currentValue;
        this.profitOrLossAmount = profitOrLossAmount;
        this.profitOrLossLabel = profitOrLossLabel;
        this.distributionByType = distributionByType;
        this.distributionBySector = distributionBySector;
        this.distributionByCapSize = distributionByCapSize;
        this.investments = investments;
    }

    // Getters & Setters
    public Double getTotalInvested() {
        return totalInvested;
    }

    public void setTotalInvested(Double totalInvested) {
        this.totalInvested = totalInvested;
    }

    public Double getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(Double currentValue) {
        this.currentValue = currentValue;
    }

    public Double getProfitOrLossAmount() {
        return profitOrLossAmount;
    }

    public void setProfitOrLossAmount(Double profitOrLossAmount) {
        this.profitOrLossAmount = profitOrLossAmount;
    }

    public String getProfitOrLossLabel() {
        return profitOrLossLabel;
    }

    public void setProfitOrLossLabel(String profitOrLossLabel) {
        this.profitOrLossLabel = profitOrLossLabel;
    }

    public Map<String, Long> getDistributionByType() {
        return distributionByType;
    }

    public void setDistributionByType(Map<String, Long> distributionByType) {
        this.distributionByType = distributionByType;
    }

    public Map<String, Long> getDistributionBySector() {
        return distributionBySector;
    }

    public void setDistributionBySector(Map<String, Long> distributionBySector) {
        this.distributionBySector = distributionBySector;
    }

    public Map<String, Long> getDistributionByCapSize() {
        return distributionByCapSize;
    }

    public void setDistributionByCapSize(Map<String, Long> distributionByCapSize) {
        this.distributionByCapSize = distributionByCapSize;
    }

    public List<InvestmentSummary> getInvestments() {
        return investments;
    }

    public void setInvestments(List<InvestmentSummary> investments) {
        this.investments = investments;
    }

    // ✅ Nested class for investment details
    public static class InvestmentSummary {
        private Long investmentId;
        private String name;
        private String type;
        private String sector;
        private String capSize;
        private int quantityBought;
        private double purchasePrice;
        private double currentPrice;
        private double profitOrLoss;

        public InvestmentSummary() {
            this.investmentId = null;
            this.name = "";
            this.type = "";
            this.sector = "";
            this.capSize = "";
            this.quantityBought = 0;
            this.purchasePrice = 0.0;
            this.currentPrice = 0.0;
            this.profitOrLoss = 0.0;
        }

        public InvestmentSummary(Long investmentId, String name, String type, String sector, String capSize,
                                 int quantityBought, double purchasePrice, double currentPrice, double profitOrLoss) {
            this.investmentId = investmentId;
            this.name = name;
            this.type = type;
            this.sector = sector;
            this.capSize = capSize;
            this.quantityBought = quantityBought;
            this.purchasePrice = purchasePrice;
            this.currentPrice = currentPrice;
            this.profitOrLoss = profitOrLoss;
        }

        // Getters & Setters
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

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getSector() {
            return sector;
        }

        public void setSector(String sector) {
            this.sector = sector;
        }

        public String getCapSize() {
            return capSize;
        }

        public void setCapSize(String capSize) {
            this.capSize = capSize;
        }

        public int getQuantityBought() {
            return quantityBought;
        }

        public void setQuantityBought(int quantityBought) {
            this.quantityBought = quantityBought;
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

        public double getProfitOrLoss() {
            return profitOrLoss;
        }

        public void setProfitOrLoss(double profitOrLoss) {
            this.profitOrLoss = profitOrLoss;
        }
    }
}
