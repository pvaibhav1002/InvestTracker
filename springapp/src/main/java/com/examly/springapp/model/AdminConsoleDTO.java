package com.examly.springapp.model;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
public class AdminConsoleDTO {
    private long totalUsers;
    private long totalInvestments;
    private double totalInvestedAmount;
    private Map<String, Long> distributionByType;
    private Map<String, Long> distributionBySector;
    private Map<String, Long> distributionByCapSize;
    private List<UserInvestmentSummary> userSummaries;
 
    public AdminConsoleDTO() {
        this.totalUsers = 0;
        this.totalInvestments = 0;
        this.totalInvestedAmount = 0;
        this.distributionByType = new HashMap<>();
        this.distributionBySector = new HashMap<>();
        this.distributionByCapSize = new HashMap<>();
        this.userSummaries = new ArrayList<>();
    }
 
    public AdminConsoleDTO(long totalUsers, long totalInvestments, double totalInvestedAmount,
            Map<String, Long> distributionByType, Map<String, Long> distributionBySector,
            Map<String, Long> distributionByCapSize, List<UserInvestmentSummary> userSummaries) {
        this.totalUsers = totalUsers;
        this.totalInvestments = totalInvestments;
        this.totalInvestedAmount = totalInvestedAmount;
        this.distributionByType = distributionByType;
        this.distributionBySector = distributionBySector;
        this.distributionByCapSize = distributionByCapSize;
        this.userSummaries = userSummaries;
    }
 
    public long getTotalUsers() {
        return totalUsers;
    }
 
    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }
 
    public long getTotalInvestments() {
        return totalInvestments;
    }
 
    public void setTotalInvestments(long totalInvestments) {
        this.totalInvestments = totalInvestments;
    }
 
    public double getTotalInvestedAmount() {
        return totalInvestedAmount;
    }
 
    public void setTotalInvestedAmount(double totalInvestedAmount) {
        this.totalInvestedAmount = totalInvestedAmount;
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
 
    public List<UserInvestmentSummary> getUserSummaries() {
        return userSummaries;
    }
 
    public void setUserSummaries(List<UserInvestmentSummary> userSummaries) {
        this.userSummaries = userSummaries;
    }
 
    public static class UserInvestmentSummary {
        private Long userId;
        private String username;
        private boolean active;
        private double totalInvested;
        private double currentInvestment;
        private double currentProfit;
 
        public UserInvestmentSummary() {
            this.userId = null;
            this.username = "";
            this.active = true;
            this.totalInvested = 0;
            this.currentInvestment = 0;
            this.currentProfit = 0;
        }
 
        public UserInvestmentSummary(Long userId, String username, boolean active, double totalInvested,
                double currentInvestment, double currentProfit) {
            this.userId = userId;
            this.username = username;
            this.active = active;
            this.totalInvested = totalInvested;
            this.currentInvestment = currentInvestment;
            this.currentProfit = currentProfit;
        }
 
        public Long getUserId() {
            return userId;
        }
 
        public void setUserId(Long userId) {
            this.userId = userId;
        }
 
        public String getUsername() {
            return username;
        }
 
        public void setUsername(String username) {
            this.username = username;
        }
 
        public boolean isActive() {
            return active;
        }
 
        public void setActive(boolean active) {
            this.active = active;
        }
 
        public double getTotalInvested() {
            return totalInvested;
        }
 
        public void setTotalInvested(double totalInvested) {
            this.totalInvested = totalInvested;
        }
 
        public double getCurrentInvestment() {
            return currentInvestment;
        }
 
        public void setCurrentInvestment(double currentInvestment) {
            this.currentInvestment = currentInvestment;
        }
 
        public double getCurrentProfit() {
            return currentProfit;
        }
 
        public void setCurrentProfit(double currentProfit) {
            this.currentProfit = currentProfit;
        }
 
    }
}
