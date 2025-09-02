package com.examly.springapp.model;
import java.util.Map;

public class UserPortfolioDTO {
    private Double totalInvested;
    private Double currentValue;
    private Double profitOrLossAmount;
    private String profitOrLossLabel;
    private Map<String, Long> distributionByType;
    private Map<String, Long> distributionBySector;
    private Map<String, Long> distributionByCapSize;

    public UserPortfolioDTO() {
    }

    public UserPortfolioDTO(Double totalInvested, Double currentValue, Double profitOrLossAmount,
            String profitOrLossLabel,
            Map<String, Long> distributionByType,
            Map<String, Long> distributionBySector,
            Map<String, Long> distributionByCapSize) {
        this.totalInvested = totalInvested;
        this.currentValue = currentValue;
        this.profitOrLossAmount = profitOrLossAmount;
        this.profitOrLossLabel = profitOrLossLabel;
        this.distributionByType = distributionByType;
        this.distributionBySector = distributionBySector;
        this.distributionByCapSize = distributionByCapSize;
    }

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

}